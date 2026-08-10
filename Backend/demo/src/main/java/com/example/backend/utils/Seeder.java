package com.example.backend.utils;

import com.example.backend.DAO.BedrijfCrediteurRepository;
import com.example.backend.DAO.BedrijfRepository;
import com.example.backend.DAO.UserRepository;
import com.example.backend.models.Bedrijf;
import com.example.backend.models.BedrijfCrediteur;
import com.example.backend.models.CustomUser;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Component
public class Seeder {

    private final BedrijfCrediteurRepository bedrijfCrediteurRepository;
    private final BedrijfRepository bedrijfRepository;
    private final UserRepository userRepository;

    public Seeder(BedrijfCrediteurRepository bedrijfCrediteurRepository, BedrijfRepository bedrijfRepository, UserRepository userRepository) {
        this.bedrijfCrediteurRepository = bedrijfCrediteurRepository;
        this.bedrijfRepository = bedrijfRepository;
        this.userRepository = userRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        Bedrijf zeeman = new Bedrijf("Zeeman", "Zeeman123!");

        bedrijfRepository.save(zeeman);

        CustomUser zeemanEigenaar = new CustomUser();

        zeemanEigenaar.setEmail("Zeeman@eigenaar.com");
        zeemanEigenaar.setPassword(encoder.encode("Zeeman123!"));
        zeemanEigenaar.setRole("ROLE_ADMIN");
        zeemanEigenaar.setBedrijf(zeeman);

        userRepository.save(zeemanEigenaar);

        CustomUser zeemanManager = new CustomUser();

        zeemanManager.setEmail("Zeeman@manager.com");
        zeemanManager.setPassword(encoder.encode("Zeeman123!"));
        zeemanManager.setRole("ROLE_ADMIN");
        zeemanManager.setBedrijf(zeeman);

        userRepository.save(zeemanManager);

        for (int i = 1; i <= 10; i++) {
            BedrijfCrediteur crediteur = new BedrijfCrediteur(
                    "AJan Smith " + i,
                    "Ajansmith" + i + "@gmail.com",
                    BedrijfCrediteur.Status.REVIEW,
                    zeeman,
                    zeemanEigenaar
            );

            crediteur.setStatus(BedrijfCrediteur.Status.ACCEPTED);

            bedrijfCrediteurRepository.save(crediteur);
        }

        for (int i = 1; i <= 10; i++) {
            BedrijfCrediteur crediteur = new BedrijfCrediteur(
                    "RJan Smith " + i,
                    "Rjansmith" + i + "@gmail.com",
                    BedrijfCrediteur.Status.REVIEW,
                    zeeman,
                    zeemanEigenaar
            );

            bedrijfCrediteurRepository.save(crediteur);
        }
    }
}
