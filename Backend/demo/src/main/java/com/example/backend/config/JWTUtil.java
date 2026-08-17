package com.example.backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.example.backend.models.CustomUser;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
public class JWTUtil {
    @Value("${jwt.secret}")
    private String secret;

    @PostConstruct
    public void checkSecret() {
        System.out.println("JWT SECRET = " + secret);
    }


    public String generateToken(CustomUser customUser) throws IllegalArgumentException, JWTCreationException {

        String token = JWT.create()
                .withSubject("User Details")
                .withClaim("email", customUser.getEmail())
                .withClaim("id", customUser.getId())
                .withClaim("role", customUser.getRole())
                .withIssuedAt(new Date())
                .withExpiresAt(this.createExpirationDate())
                .withIssuer("BoekhoudDrerries")
                .sign(Algorithm.HMAC256(secret));

        return token;
    }

    public DecodedJWT validateToken(String token) throws JWTVerificationException {

        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withSubject("User Details")
                .withIssuer("BoekhoudDrerries")
                .build();

        return verifier.verify(token);
    }

    private Date createExpirationDate(){
        int expirationHours = 6;
        Calendar appendableDate = Calendar.getInstance();
        appendableDate.setTime(new Date());
        appendableDate.add(Calendar.HOUR, expirationHours);
        return appendableDate.getTime();
    }
}
