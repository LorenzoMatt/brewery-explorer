package com.example.brewery.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "Detailed information about a validation error")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationError {

    @Schema(description = "Field where the validation error occurred")
    private String field;

    @Schema(description = "Description of the validation error")
    private String error;

    @Schema(description = "Invalid value provided for the field")
    private Object value;
}
