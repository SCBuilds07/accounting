package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity()
@Table(name = "Users")
public class CustomUser {
    @Id
    @GeneratedValue
    private Long id;

    private String email;
    private String password;
    private String role;

    @ManyToOne
    @JoinColumn(name = "bedrijf_id", referencedColumnName = "id")
    @JsonManagedReference
    private Bedrijf bedrijf;

    public CustomUser(String email, String password, String role, Bedrijf bedrijf) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.bedrijf = bedrijf;
    }

    public CustomUser() {

    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Bedrijf getBedrijf() {
        return bedrijf;
    }

    public void setBedrijf(Bedrijf bedrijf) {
        this.bedrijf = bedrijf;
    }
}
