package com.example.brewery.model;

import com.example.brewery.dto.BreweryType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BreweryApiResponse {
    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("brewery_type")
    private BreweryType breweryType;

    @JsonProperty("address_1")
    private String address1;

    @JsonProperty("address_2")
    private String address2;

    @JsonProperty("address_3")
    private String address3;

    @JsonProperty("city")
    private String city;

    @JsonProperty("state_province")
    private String stateProvince;

    @JsonProperty("postal_code")
    private String postalCode;

    @JsonProperty("country")
    private String country;

    @JsonProperty("longitude")
    private String longitude;

    @JsonProperty("latitude")
    private String latitude;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("website_url")
    private String websiteUrl;

    @JsonProperty("state")
    private String state;

    @JsonProperty("street")
    private String street;
}
