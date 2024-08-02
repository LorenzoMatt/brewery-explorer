package com.example.brewery.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum BreweryType {
    MICRO("micro"),
    NANO("nano"),
    REGIONAL("regional"),
    BREWPUB("brewpub"),
    LARGE("large"),
    PLANNING("planning"),
    BAR("bar"),
    CONTRACT("contract"),
    PROPRIETOR("proprietor"),
    CLOSED("closed"),
    TAPROOM("taproom"),
    LOCATION("location");

    private final String type;

    BreweryType(String type) {
        this.type = type;
    }

    @JsonValue
    public String getType() {
        return type;
    }

    @JsonCreator
    public static BreweryType fromString(String type) {
        for (BreweryType breweryType : BreweryType.values()) {
            if (breweryType.type.equalsIgnoreCase(type)) {
                return breweryType;
            }
        }
        throw new IllegalArgumentException("Invalid brewery type: " + type);
    }
}
