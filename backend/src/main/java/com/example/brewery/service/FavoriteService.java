package com.example.brewery.service;

import com.example.brewery.dto.BreweryDto;

import java.util.List;

public interface FavoriteService {

    void addFavorite(String username, String breweryId);

    void removeFavorite(String username, String breweryId);

    List<BreweryDto> getUserFavorites(String username);

    List<String> getUserFavoriteIds(String username);

    boolean isBreweryInFavorites(String username, String breweryId);

}
