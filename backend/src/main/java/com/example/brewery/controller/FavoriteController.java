package com.example.brewery.controller;

import com.example.brewery.dto.BreweryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface FavoriteController {

    void addFavorite(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String breweryId);

    void removeFavorite(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String breweryId);

    ResponseEntity<List<BreweryDto>> getUserFavorites(@AuthenticationPrincipal UserDetails userDetails);

    ResponseEntity<List<String>> getUserFavoriteIds(@AuthenticationPrincipal UserDetails userDetails);

    ResponseEntity<Boolean> isFavorite(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String breweryId);
}
