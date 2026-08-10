package com.example.backend.DAO;

import com.example.backend.models.Bedrijf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BedrijfRepository extends JpaRepository<Bedrijf, Long> {
}
