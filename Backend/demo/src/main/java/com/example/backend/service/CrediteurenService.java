package com.example.backend.service;

import com.example.backend.DAO.BedrijfCrediteurRepository;
import com.example.backend.DAO.BedrijfRepository;
import com.example.backend.DAO.UserRepository;
import com.example.backend.DTO.CrediteurDTO;
import com.example.backend.DTO.ReviewDTO;
import com.example.backend.models.Bedrijf;
import com.example.backend.models.BedrijfCrediteur;
import com.example.backend.models.CustomUser;
import com.example.backend.models.Review;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class CrediteurenService {

    private final FileService fileService;
    private final BedrijfCrediteurRepository bedrijfCrediteurRepository;
    private final BedrijfRepository bedrijfRepository;
    private final UserRepository userRepository;

    public CrediteurenService(FileService fileService, BedrijfCrediteurRepository bedrijfCrediteurRepository, BedrijfRepository bedrijfRepository, UserRepository userRepository) {
        this.fileService = fileService;
        this.bedrijfCrediteurRepository = bedrijfCrediteurRepository;
        this.bedrijfRepository = bedrijfRepository;
        this.userRepository = userRepository;
    }

    private Bedrijf getBedrijf(long id) {
        Optional<CustomUser> customUser = userRepository.findById(id);

        if (customUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        }

        Optional<Bedrijf> bedrijf = bedrijfRepository.findById(customUser.get().getBedrijf().getId());

        if (bedrijf.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        }

        return bedrijf.get();
    }

    public List<BedrijfCrediteur> getAllAcceptedCrediteuren(long id) {
        Bedrijf bedrijf = getBedrijf(id);

        return bedrijfCrediteurRepository.findAllByStatusAndBedrijf(BedrijfCrediteur.Status.ACCEPTED, bedrijf);
    }

    public List<BedrijfCrediteur> getAllPendingCrediteuren(long id) {
        Bedrijf bedrijf = getBedrijf(id);

        Optional<CustomUser> customUser = userRepository.findById(id);

        if (customUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        }

        return bedrijfCrediteurRepository.findAllByStatusAndBedrijfAndCustomUserNot(BedrijfCrediteur.Status.PENDING, bedrijf, customUser.get());
    }

    public List<BedrijfCrediteur>  getAllReviewableCrediteuren(Long id) {
        Bedrijf bedrijf = getBedrijf(id);

        Optional<CustomUser> customUser = userRepository.findById(id);

        if (customUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        }

        return bedrijfCrediteurRepository.findAllByStatusAndBedrijfAndCustomUser(BedrijfCrediteur.Status.REVIEW, bedrijf, customUser.get());
    }

    public ResponseEntity<BedrijfCrediteur> createCrediteur(CrediteurDTO crediteurDTO, long id) {
        Optional<CustomUser> customUser = userRepository.findById(id);

        if (customUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        }

        Bedrijf bedrijf = getBedrijf(id);

        BedrijfCrediteur crediteur = new BedrijfCrediteur();

        crediteur.setName(crediteurDTO.getName());
        crediteur.setEmail(crediteurDTO.getEmail());
        crediteur.setBedrijf(bedrijf);
        crediteur.setCustomUser(customUser.get());

        bedrijfCrediteurRepository.save(crediteur);

        return ResponseEntity.status(HttpStatus.CREATED).body(crediteur);
    }

    public BedrijfCrediteur getCrediteurById(long id) {
        Optional<BedrijfCrediteur> crediteur = bedrijfCrediteurRepository.findById(id);
        return crediteur.orElse(null);
    }

    public BedrijfCrediteur handleCrediteur(String action, ReviewDTO reviewDTO) {
        Optional<BedrijfCrediteur> crediteurOptional = bedrijfCrediteurRepository.findById(reviewDTO.getCrediteur_id());

        if (crediteurOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        } else {
            BedrijfCrediteur crediteur = crediteurOptional.get();
            crediteur.setStatus(BedrijfCrediteur.Status.valueOf(action));
            crediteur.setName(reviewDTO.getName());
            crediteur.setEmail(reviewDTO.getEmail());
            bedrijfCrediteurRepository.save(crediteur);
            return crediteur;
        }
    }
}
