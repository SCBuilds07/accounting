package com.example.backend.DTO;

public class ReviewDTO {
    private String message;
    private Long crediteur_id;
    private String name;
    private String email;

    public String getMessage() {
        return message;
    }

    public Long getCrediteur_id() {
        return crediteur_id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }
}
