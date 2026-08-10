package com.example.backend.controller;

import com.example.backend.DTO.*;
import com.example.backend.models.BedrijfCrediteur;
import com.example.backend.models.Review;
import com.example.backend.service.CrediteurenService;
import com.example.backend.service.ReviewService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crediteur")
public class CrediteurenController {

    private final CrediteurenService crediteurenService;
    private final ReviewService reviewService;
    private final UserService userService;

    public CrediteurenController(CrediteurenService crediteurenService, ReviewService reviewService, UserService userService) {
        this.crediteurenService = crediteurenService;
        this.reviewService = reviewService;
        this.userService = userService;
    }

    @GetMapping("/bedrijf")
    public List<BedrijfCrediteurResponse> getAllActiveCrediteur() {
        Long userId = userService.getCurrentUserId();

        List<BedrijfCrediteurResponse> acceptedCrediteuren = crediteurenService.getAllAcceptedCrediteuren(userId).stream()
                .map(BedrijfCrediteurResponse::new)
                .toList();

        return acceptedCrediteuren;
    }

    @GetMapping("/pending")
    public List<BedrijfCrediteurResponse> getAllPendingCrediteur() {
        Long userId = userService.getCurrentUserId();

        List<BedrijfCrediteurResponse> pendingCrediteuren = crediteurenService.getAllPendingCrediteuren(userId).stream()
                .map(BedrijfCrediteurResponse::new)
                .toList();

        return pendingCrediteuren;
    }

    @GetMapping("/reviewable")
    public List<BedrijfCrediteurResponse> getAllReviewableCrediteur() {
        Long userId = userService.getCurrentUserId();

        List<BedrijfCrediteurResponse> reviewableCrediteuren = crediteurenService.getAllReviewableCrediteuren(userId).stream()
                .map(BedrijfCrediteurResponse::new)
                .toList();

        return reviewableCrediteuren;
    }

    @GetMapping("/pending/length")
    public int getPendingReviewsSize() {
        Long userId = userService.getCurrentUserId();
        return crediteurenService.getAllPendingCrediteuren(userId).size();
    }

    @GetMapping("/{id}")
    public CrediteurResponse getCrediteurById(@PathVariable long id) {
        BedrijfCrediteur bedrijfCrediteur = crediteurenService.getCrediteurById(id);
        List<Review> reviewList = reviewService.getReviewsByCrediteur(bedrijfCrediteur.getId());

        BedrijfCrediteurResponse bedrijfCrediteurResponse = new BedrijfCrediteurResponse(bedrijfCrediteur);

        List<ReviewResponse> reviews = reviewList.stream()
                .map(ReviewResponse::new)
                .toList();

        return new CrediteurResponse(bedrijfCrediteurResponse, reviews);
    }

    @PostMapping("/create")
    public ResponseEntity<BedrijfCrediteur> createCrediteur(@RequestBody CrediteurDTO crediteurDTO){
        Long userId = userService.getCurrentUserId();
        return crediteurenService.createCrediteur(crediteurDTO, userId);
    }

    @PutMapping("/{action}")
    public BedrijfCrediteur handleCrediteur(@PathVariable String action, @RequestBody ReviewDTO reviewDTO){
        if (action.equals("REVIEW")) {
            System.out.println("Reason: " + reviewDTO.getMessage());
            this.reviewService.createReview(reviewDTO);

        }
        return crediteurenService.handleCrediteur(action, reviewDTO);
    }
}
