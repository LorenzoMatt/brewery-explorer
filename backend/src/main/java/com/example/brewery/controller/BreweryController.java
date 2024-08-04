package com.example.brewery.controller;

import com.example.brewery.dto.BreweryDto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BreweryController {

    ResponseEntity<List<BreweryDto>> getBreweries(@RequestParam @Min(0) int page, @RequestParam @Min(1) int size);

    ResponseEntity<BreweryDto> getBreweryById(@PathVariable String id);

    ResponseEntity<List<BreweryDto>> searchBreweries(@RequestParam(required = false) @Size(max = 50) String name,
            @RequestParam(required = false) @Size(max = 50) String city,
            @RequestParam(required = false) @Size(max = 50) String state,
            @RequestParam(required = false) String breweryType);
}
