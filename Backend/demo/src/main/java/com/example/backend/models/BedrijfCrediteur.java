package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class BedrijfCrediteur {
    public enum Status {
        ACCEPTED,
        PENDING,
        REVIEW,
        DENIED
    }


    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;
    private Status status = Status.PENDING;

    @ManyToOne
    @JoinColumn(name = "bedrijf_id", referencedColumnName = "id")
    @JsonManagedReference
    private Bedrijf bedrijf;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    @JsonManagedReference
    private CustomUser customUser;

    public BedrijfCrediteur(String name, String email, Status status ,Bedrijf bedrijf, CustomUser customUser) {
        this.name = name;
        this.email = email;
        this.status = Status.PENDING;
        this.bedrijf = bedrijf;
        this.customUser = customUser;
    }

    public BedrijfCrediteur() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Bedrijf getBedrijf() {
        return bedrijf;
    }

    public void setBedrijf(Bedrijf bedrijf) {
        this.bedrijf = bedrijf;
    }

    public CustomUser getCustomUser() {
        return customUser;
    }

    public void setCustomUser(CustomUser customUser) {
        this.customUser = customUser;
    }
}
