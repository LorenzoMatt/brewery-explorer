package com.example.brewery.controller;

import com.example.brewery.dto.BreweryDto;
import com.example.brewery.exception.ErrorResponse;
import com.example.brewery.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Operation(summary = "Add a brewery to favorites")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Brewery added to favorites successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @PostMapping("/add")
    public void addFavorite(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String breweryId) {
        favoriteService.addFavorite(userDetails.getUsername(), breweryId);
    }

    @Operation(summary = "Remove a brewery from favorites")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Brewery removed from favorites successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @DeleteMapping("/remove")
    public void removeFavorite(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String breweryId) {
        favoriteService.removeFavorite(userDetails.getUsername(), breweryId);
    }

    @Operation(summary = "Get favorite breweries of a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Favorite breweries retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BreweryDto.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @GetMapping
    public List<BreweryDto> getUserFavorites(@AuthenticationPrincipal UserDetails userDetails) {
        return favoriteService.getUserFavorites(userDetails.getUsername());
    }
}
