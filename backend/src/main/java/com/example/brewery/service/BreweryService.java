package com.example.brewery.service;

import com.example.brewery.dto.BreweryDto;
import com.example.brewery.dto.BreweryType;
import com.example.brewery.model.BreweryApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class BreweryService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final String apiUrl;

    private final RestTemplate restTemplate;

    @Autowired
    public BreweryService(@Value("${brewery.api.url}") String apiUrl, RestTemplate restTemplate) {
        this.apiUrl = apiUrl;
        this.restTemplate = restTemplate;
    }

    @Cacheable("breweries")
    public List<BreweryDto> getBreweries(int page, int size) {
        logger.info("Fetching breweries - page: {}, size: {}", page, size);
        String url = apiUrl + "?page=" + page + "&per_page=" + size;
        BreweryApiResponse[] breweries = restTemplate.getForObject(url, BreweryApiResponse[].class);

        if (breweries == null || breweries.length == 0) {
            logger.warn("No breweries found for page: {}, size: {}", page, size);
        } else {
            logger.info("Found {} breweries for page: {}, size: {}", breweries.length, page, size);
        }

        return Arrays.stream(breweries != null ? breweries : new BreweryApiResponse[0]).map(this::convertToDto).collect(Collectors.toList());
    }

    @Cacheable("brewery")
    public BreweryDto getBreweryById(String id) {
        logger.info("Fetching brewery with ID: {}", id);
        String url = apiUrl + "/" + id;
        BreweryApiResponse brewery = restTemplate.getForObject(url, BreweryApiResponse.class);

        if (brewery == null) {
            logger.error("Brewery not found with ID: {}", id);
            throw new NoSuchElementException("Brewery not found with id " + id);
        }

        logger.info("Brewery found with ID: {}", id);
        return convertToDto(brewery);
    }

    public List<BreweryDto> searchBreweries(String name, String city, String state, String breweryType) {
        logger.info("Searching breweries - name: {}, city: {}, state: {}, type: {}", name, city, state, breweryType);

        StringBuilder url = new StringBuilder(apiUrl);
        url.append("?");

        boolean hasQueryParam = false;

        if (name != null && !name.trim().isEmpty()) {
            url.append("by_name=").append(URLEncoder.encode(name, StandardCharsets.UTF_8));
            hasQueryParam = true;
        }

        if (city != null && !city.trim().isEmpty()) {
            if (hasQueryParam)
                url.append("&");
            url.append("by_city=").append(URLEncoder.encode(city, StandardCharsets.UTF_8));
            hasQueryParam = true;
        }

        if (state != null && !state.trim().isEmpty()) {
            if (hasQueryParam)
                url.append("&");
            url.append("by_state=").append(URLEncoder.encode(state, StandardCharsets.UTF_8));
            hasQueryParam = true;
        }

        if (breweryType != null && !breweryType.trim().isEmpty()) {
            if (hasQueryParam)
                url.append("&");
            url.append("by_type=").append(URLEncoder.encode(breweryType, StandardCharsets.UTF_8));
        }

        BreweryApiResponse[] breweries = restTemplate.getForObject(url.toString(), BreweryApiResponse[].class);

        if (breweries == null || breweries.length == 0) {
            logger.warn("No breweries found for search criteria - name: {}, city: {}, state: {}, type: {}", name, city, state, breweryType);
        } else {
            logger.info("Found {} breweries for search criteria - name: {}, city: {}, state: {}, type: {}", breweries.length, name, city, state, breweryType);
        }

        return Arrays.stream(breweries != null ? breweries : new BreweryApiResponse[0]).map(this::convertToDto).collect(Collectors.toList());
    }

    private BreweryDto convertToDto(BreweryApiResponse apiResponse) {
        BreweryDto dto = new BreweryDto();
        dto.setId(apiResponse.getId());
        dto.setName(apiResponse.getName());
        dto.setBreweryType(BreweryType.fromString(apiResponse.getBreweryType()));
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
