package com.example.brewery.controller;

import com.example.brewery.dto.BreweryDto;
import com.example.brewery.exception.ErrorResponse;
import com.example.brewery.service.BreweryService;
import com.example.brewery.validation.BreweryTypeValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/breweries")
@Validated
public class BreweryController {

    private final BreweryService breweryService;

    @Autowired
    public BreweryController(BreweryService breweryService) {
        this.breweryService = breweryService;
    }

    @Operation(summary = "Get a paginated list of breweries")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of breweries retrieved successfully", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = BreweryDto.class)))),
            @ApiResponse(responseCode = "400", description = "Invalid pagination parameters", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @GetMapping
    public ResponseEntity<List<BreweryDto>> getBreweries(@RequestParam @Min(0) int page, @RequestParam @Min(1) int size) {
        List<BreweryDto> breweries = breweryService.getBreweries(page, size);
        return ResponseEntity.ok(breweries);
    }

    @Operation(summary = "Get details of a specific brewery by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Brewery details retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BreweryDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid brewery ID", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "Brewery not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @GetMapping("/{id}")
    public ResponseEntity<BreweryDto> getBreweryById(@PathVariable String id) {
        BreweryDto brewery = breweryService.getBreweryById(id);
        return ResponseEntity.ok(brewery);
    }

    @Operation(summary = "Search and filter breweries")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Breweries retrieved successfully", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = BreweryDto.class)))),
            @ApiResponse(responseCode = "400", description = "Invalid search parameters", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))) })
    @GetMapping("/search")
    public ResponseEntity<List<BreweryDto>> searchBreweries(@RequestParam(required = false) String name, @RequestParam(required = false) String city, @RequestParam(required = false) String state,
            @RequestParam(required = false) @BreweryTypeValidator String breweryType) {
        List<BreweryDto> breweries = breweryService.searchBreweries(name, city, state, breweryType);
        return ResponseEntity.ok(breweries);
    }
}
