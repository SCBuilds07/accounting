package com.example.backend.DTO;

import com.example.backend.models.Bedrijf;

public class LoginResponse {
    public String userId;
    public String email;
    public String role;
    public Bedrijf bedrijf;

    public LoginResponse(Long userId, String email, String role, Bedrijf bedrijf) {
        this.userId = String.valueOf(userId);
        this.email = email;
        this.role = role;
        this.bedrijf = bedrijf;
    }
}
