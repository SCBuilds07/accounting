package com.example.backend.DTO;

import com.example.backend.models.Bedrijf;
import com.example.backend.models.BedrijfCrediteur;

public class BedrijfCrediteurResponse {
    public Long id;
    public String name;
    public String email;
    public BedrijfCrediteur.Status status;
    public Long customUserId;

    public BedrijfCrediteurResponse(BedrijfCrediteur crediteur) {
        this.id = crediteur.getId();
        this.name = crediteur.getName();
        this.email = crediteur.getEmail();
        this.status = crediteur.getStatus();
        this.customUserId = crediteur.getCustomUser().getId();
    }
}
