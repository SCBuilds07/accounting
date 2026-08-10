package com.example.backend.service;

import com.example.backend.DAO.BedrijfCrediteurRepository;
import com.example.backend.DAO.ReviewRepository;
import com.example.backend.DAO.UserRepository;
import com.example.backend.DTO.ReviewDTO;
import com.example.backend.models.BedrijfCrediteur;
import com.example.backend.models.CustomUser;
import com.example.backend.models.Review;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BedrijfCrediteurRepository bedrijfCrediteurRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public ReviewService(ReviewRepository reviewRepository, BedrijfCrediteurRepository bedrijfCrediteurRepository, UserRepository userRepository, UserService userService) {
        this.reviewRepository = reviewRepository;
        this.bedrijfCrediteurRepository = bedrijfCrediteurRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public List<Review> getReviewsByCrediteur(Long crediteur_id) {

        Optional<BedrijfCrediteur> optionalBedrijfCrediteur = bedrijfCrediteurRepository.findById(crediteur_id);

        if (optionalBedrijfCrediteur.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        }

        return this.reviewRepository.findAllByBedrijfCrediteur(optionalBedrijfCrediteur.get());
    }

    public void createReview(ReviewDTO reviewDTO) {
        Optional<CustomUser> optionalCustomUser = userRepository.findById(userService.getCurrentUserId());
        Optional<BedrijfCrediteur> optionalBedrijfCrediteur = bedrijfCrediteurRepository.findById(reviewDTO.getCrediteur_id());

        if (optionalBedrijfCrediteur.isEmpty() || optionalCustomUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Something went wrong.");
        }

        Review review = new Review();
        review.setMessage(reviewDTO.getMessage());
        review.setBedrijfCrediteur(optionalBedrijfCrediteur.get());
        review.setEmail(optionalCustomUser.get().getEmail());

        reviewRepository.save(review);
    }
}
