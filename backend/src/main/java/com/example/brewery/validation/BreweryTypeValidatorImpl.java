package com.example.brewery.validation;

import com.example.brewery.dto.BreweryType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class BreweryTypeValidatorImpl implements ConstraintValidator<BreweryTypeValidator, String> {

    private List<String> allowedValues;

    @Override
    public void initialize(BreweryTypeValidator constraintAnnotation) {
        allowedValues = Arrays.stream(BreweryType.values())
                .map(BreweryType::getType)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || allowedValues.contains(value)) {
            return true;
        }

        String possibleValues = String.join(", ", allowedValues);

        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(
                "Invalid brewery type. Allowed values are: " + possibleValues
        ).addConstraintViolation();

        return false;
    }
}
