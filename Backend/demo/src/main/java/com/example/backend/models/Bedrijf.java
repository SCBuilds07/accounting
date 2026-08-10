package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class Bedrijf {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String password;

    public Bedrijf(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public Bedrijf() {

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
}
