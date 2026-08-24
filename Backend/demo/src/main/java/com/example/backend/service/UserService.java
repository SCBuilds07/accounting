package com.example.backend.service;

import com.example.backend.DAO.UserRepository;
import com.example.backend.DTO.AccountDTO;
import com.example.backend.models.CustomUser;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userDAO) {
        this.userRepository = userDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        CustomUser customUser = userRepository.findByEmail(email);
        if (customUser == null) {
            throw new UsernameNotFoundException("Gebruiker niet gevonden met e-mail: " + email);
        }

        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(customUser.getRole())
        );

        return new User(
                customUser.getEmail(),
                customUser.getPassword(),
                authorities
        );
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println(authentication.getPrincipal());

        return (Long) authentication.getPrincipal();
    }


    public AccountDTO getCurrentUserInformation(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long user_id = (Long) authentication.getPrincipal();

        Optional<CustomUser> optionalCustomUser = userRepository.findById(user_id);

        if (optionalCustomUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        }

        CustomUser customUser = optionalCustomUser.get();



        AccountDTO accountDTO = new AccountDTO(customUser.getEmail(), customUser.getRole());

        return accountDTO;

    }
}
