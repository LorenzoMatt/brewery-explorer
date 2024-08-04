package com.example.brewery.controller;

import com.example.brewery.dto.BreweryDto;
import com.example.brewery.exception.ErrorResponse;
import com.example.brewery.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteControllerImpl implements FavoriteController{

    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteControllerImpl(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @Override
    @Operation(summary = "Add a brewery to favorites")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Brewery added to favorites successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @PostMapping("/add")
    public void addFavorite(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String breweryId) {
        favoriteService.addFavorite(userDetails.getUsername(), breweryId);
    }

    @Override
    @Operation(summary = "Remove a brewery from favorites")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Brewery removed from favorites successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @DeleteMapping("/remove")
    public void removeFavorite(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String breweryId) {
        favoriteService.removeFavorite(userDetails.getUsername(), breweryId);
    }

    @Override
    @Operation(summary = "Get favorite breweries of a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Favorite breweries retrieved successfully", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = BreweryDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))})
    @GetMapping
    public ResponseEntity<List<BreweryDto>> getUserFavorites(@AuthenticationPrincipal UserDetails userDetails) {
        List<BreweryDto> userFavorites = favoriteService.getUserFavorites(userDetails.getUsername());
        return ResponseEntity.ok(userFavorites);
    }

    @Override
    @Operation(summary = "Get list of favorite brewery IDs for a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Favorite IDs retrieved successfully", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = String.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))})
    @GetMapping("/ids")
    public ResponseEntity<List<String>> getUserFavoriteIds(@AuthenticationPrincipal UserDetails userDetails) {
        List<String> favoriteIds = favoriteService.getUserFavoriteIds(userDetails.getUsername());
        return ResponseEntity.ok(favoriteIds);
    }

    @Override
    @Operation(summary = "Check if a brewery is in user's favorites")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Brewery favorite status retrieved successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/is-favorite")
    public ResponseEntity<Boolean> isFavorite(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String breweryId) {
        boolean isInFavorite = favoriteService.isBreweryInFavorites(userDetails.getUsername(), breweryId);
        return ResponseEntity.ok(isInFavorite);
    }
}
