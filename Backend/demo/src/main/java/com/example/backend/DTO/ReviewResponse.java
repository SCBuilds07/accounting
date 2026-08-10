package com.example.backend.DTO;

import com.example.backend.models.Review;

public class ReviewResponse {
    public String message;
    public String email;

    public ReviewResponse(Review review) {
        this.message = review.getMessage();
        this.email = review.getEmail();
    }
}
