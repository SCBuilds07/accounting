package com.example.backend.DAO;

import com.example.backend.models.BedrijfCrediteur;
import com.example.backend.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByBedrijfCrediteur(BedrijfCrediteur bedrijfCrediteur);
}
