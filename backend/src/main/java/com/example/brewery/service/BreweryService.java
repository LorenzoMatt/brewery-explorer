package com.example.brewery.service;

import com.example.brewery.dto.BreweryDto;

import java.util.List;

public interface BreweryService {

    List<BreweryDto> getBreweries(int page, int size);

    BreweryDto getBreweryById(String id);

    List<BreweryDto> searchBreweries(String name, String city, String state, String breweryType);

}
