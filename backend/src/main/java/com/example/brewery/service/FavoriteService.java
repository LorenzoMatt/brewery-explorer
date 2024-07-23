package com.example.brewery.service;

import com.example.brewery.dto.BreweryDto;
import com.example.brewery.entity.AppUser;
import com.example.brewery.entity.Favorite;
import com.example.brewery.model.BreweryApiResponse;
import com.example.brewery.repository.AppUserRepository;
import com.example.brewery.repository.FavoriteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String apiUrl;
    private final FavoriteRepository favoriteRepository;
    private final AppUserRepository appUserRepository;

    @Autowired
    public FavoriteService(@Value("${brewery.api.url}") String apiUrl, FavoriteRepository favoriteRepository, AppUserRepository appUserRepository) {
        this.apiUrl = apiUrl;
        this.favoriteRepository = favoriteRepository;
        this.appUserRepository = appUserRepository;
    }

    @Transactional
    public void addFavorite(String username, String breweryId) {
        logger.info("Adding favorite brewery with ID: {} for user: {}", breweryId, username);
        AppUser user = appUserRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User not found with username " + username));
        Favorite favorite = new Favorite(user, breweryId);
        favoriteRepository.save(favorite);
        logger.info("Favorite brewery with ID: {} added for user: {}", breweryId, username);
    }

    @Transactional
    public void removeFavorite(String username, String breweryId) {
        logger.info("Removing favorite brewery with ID: {} for user: {}", breweryId, username);
        favoriteRepository.deleteByUserUsernameAndBreweryId(username, breweryId);
        logger.info("Favorite brewery with ID: {} removed for user: {}", breweryId, username);
    }

    public List<BreweryDto> getUserFavorites(String username) {
        logger.info("Fetching favorite breweries for user: {}", username);
        List<String> breweryIds = favoriteRepository.findByUserUsername(username).stream().map(Favorite::getBreweryId).collect(Collectors.toList());

        if (breweryIds.isEmpty()) {
            logger.info("No favorite breweries found for user: {}", username);
            return Collections.emptyList();
        }

        RestTemplate restTemplate = new RestTemplate();
        String idsParam = String.join(",", breweryIds);
        String url = apiUrl + "?by_ids=" + idsParam;

        BreweryApiResponse[] breweries = restTemplate.getForObject(url, BreweryApiResponse[].class);

        if (breweries == null || breweries.length == 0) {
            logger.warn("No breweries found for IDs: {}", idsParam);
            return Collections.emptyList();
        }

        List<BreweryDto> favoriteBreweries = Arrays.stream(breweries).map(this::convertToDto).collect(Collectors.toList());

        logger.info("Found {} favorite breweries for user: {}", favoriteBreweries.size(), username);
        return favoriteBreweries;
    }

    public List<String> getUserFavoriteIds(String username) {
        logger.info("Fetching favorite brewery IDs for user: {}", username);
        List<String> favoriteIds = favoriteRepository.findFavoriteIdsByUsername(username);
        if (favoriteIds.isEmpty()) {
            logger.warn("No favorite breweries found for user: {}", username);
        } else {
            logger.info("Found {} favorite breweries for user: {}", favoriteIds.size(), username);
        }
        return favoriteIds;
    }

    private BreweryDto convertToDto(BreweryApiResponse apiResponse) {
        BreweryDto dto = new BreweryDto();
        dto.setId(apiResponse.getId());
        dto.setName(apiResponse.getName());
        dto.setBreweryType(apiResponse.getBreweryType());
        dto.setAddress1(apiResponse.getAddress1());
        dto.setAddress2(apiResponse.getAddress2());
        dto.setAddress3(apiResponse.getAddress3());
        dto.setCity(apiResponse.getCity());
        dto.setStateProvince(apiResponse.getStateProvince());
        dto.setPostalCode(apiResponse.getPostalCode());
        dto.setCountry(apiResponse.getCountry());
        dto.setLongitude(apiResponse.getLongitude());
        dto.setLatitude(apiResponse.getLatitude());
        dto.setPhone(apiResponse.getPhone());
        dto.setWebsiteUrl(apiResponse.getWebsiteUrl());
        dto.setState(apiResponse.getState());
        dto.setStreet(apiResponse.getStreet());
        return dto;
    }
}
