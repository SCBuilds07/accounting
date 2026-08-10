package com.example.backend.controller;

import com.example.backend.DAO.UserRepository;
import com.example.backend.DTO.AuthenticationDTO;
import com.example.backend.DTO.LoginResponse;
import com.example.backend.config.JWTUtil;
import com.example.backend.models.CustomUser;
import com.example.backend.service.CredentialValidator;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final CredentialValidator validator;

    public AuthController(UserRepository userRepository, UserService userService, JWTUtil jwtUtil, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, CredentialValidator validator) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthenticationDTO body) {
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(body.email, body.password);

            authenticationManager.authenticate(authInputToken);

            CustomUser customUser = userRepository.findByEmail(body.email);
            String token = jwtUtil.generateToken(customUser);
            LoginResponse loginResponse = new LoginResponse(
                    customUser.getId(), customUser.getEmail(), token, customUser.getRole(), customUser.getBedrijf());

            return ResponseEntity.ok(loginResponse);

        } catch (AuthenticationException authExc) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No valid credentials");
        }
    }

    @GetMapping("id")
    public Long getUserId() {
        return userService.getCurrentUserId();
    }
}
