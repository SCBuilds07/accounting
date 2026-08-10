package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.beans.ConstructorProperties;
import java.util.List;

@Entity
public class Review {

    @Id
    @GeneratedValue
    private Long id;

    private String message;

    @ManyToOne
    @JoinColumn(name = "crediteur_id", referencedColumnName = "id")
    @JsonManagedReference
    private BedrijfCrediteur bedrijfCrediteur;

    @Column(name = "reviewed_by")
    private String email;

    public Review(String message, BedrijfCrediteur bedrijfCrediteur, String email) {
        this.message = message;
        this.bedrijfCrediteur = bedrijfCrediteur;
        this.email = email;
    }

    public Review() {
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public BedrijfCrediteur getBedrijfCrediteur() {
        return bedrijfCrediteur;
    }

    public void setBedrijfCrediteur(BedrijfCrediteur bedrijfCrediteur) {
        this.bedrijfCrediteur = bedrijfCrediteur;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
