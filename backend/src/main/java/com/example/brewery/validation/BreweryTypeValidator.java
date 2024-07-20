package com.example.brewery.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = BreweryTypeValidatorImpl.class)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface BreweryTypeValidator {
    String message() default "Invalid brewery type. Allowed values are: micro, nano, regional, brewpub, large, planning, bar, contract, proprietor, closed";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
