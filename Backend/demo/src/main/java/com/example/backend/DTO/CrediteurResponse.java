package com.example.backend.DTO;

import com.example.backend.models.BedrijfCrediteur;
import com.example.backend.models.Review;

import java.util.List;

public class CrediteurResponse {
    public BedrijfCrediteurResponse bedrijfCrediteur;
    public List<ReviewResponse> reviews;

    public CrediteurResponse(
            BedrijfCrediteurResponse bedrijfCrediteur,
            List<ReviewResponse> reviews
    ) {
        this.bedrijfCrediteur = bedrijfCrediteur;
        this.reviews = reviews;
    }
}


