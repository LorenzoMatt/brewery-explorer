package com.example.brewery.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "Standard error response object for the API")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    @Schema(description = "The timestamp of the error occurrence")
    private LocalDateTime timestamp;

    @Schema(description = "HTTP status code")
    private Integer status;

    @Schema(description = "Error type or short description")
    private String error;

    @Schema(description = "Detailed error message")
    private String message;

    @Schema(description = "Request path that generated the error")
    private String path;

    @Schema(description = "List of field-specific errors, if any", nullable = true)
    List<ValidationError> errors;

    public ErrorResponse(LocalDateTime timestamp, int status, String error, String message, String path) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }
}
