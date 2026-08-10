package com.example.backend.DAO;

import com.example.backend.models.Bedrijf;
import com.example.backend.models.BedrijfCrediteur;
import com.example.backend.models.CustomUser;
import com.example.backend.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BedrijfCrediteurRepository extends JpaRepository<BedrijfCrediteur, Long> {
    List<BedrijfCrediteur> findAllByStatusAndBedrijf(BedrijfCrediteur.Status status, Bedrijf bedrijf);

    List<BedrijfCrediteur> findAllByStatusAndBedrijfAndCustomUserNot(
            BedrijfCrediteur.Status status,
            Bedrijf bedrijf,
            CustomUser customUser
    );

    List<BedrijfCrediteur> findAllByBedrijf(Bedrijf bedrijf);

    List<BedrijfCrediteur> findAllByStatusAndBedrijfAndCustomUser(BedrijfCrediteur.Status status, Bedrijf bedrijf, CustomUser customUser);
}
