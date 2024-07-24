package com.example.brewery.controller;

import com.example.brewery.dto.AuthenticationRequestDto;
import com.example.brewery.dto.AuthenticationResponseDto;
import com.example.brewery.dto.UserDto;
import com.example.brewery.exception.ErrorResponse;
import com.example.brewery.service.CustomUserDetailsService;
import com.example.brewery.util.JwtTokenUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService customUserDetailsService;

    private final JwtTokenUtil jwtTokenUtil;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(AuthenticationManager authenticationManager, CustomUserDetailsService customUserDetailsService, JwtTokenUtil jwtTokenUtil,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @Operation(summary = "Register a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully"),
            @ApiResponse(responseCode = "400", description = "User already exists", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto, HttpServletRequest request) {
        if (customUserDetailsService.userExists(userDto.getUsername())) {
            ErrorResponse errorResponse = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "USER_EXISTS",
                    "User already exists",
                    request.getRequestURI()
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        customUserDetailsService.saveUser(userDto);
        return ResponseEntity.ok("{\"message\": \"User registered successfully\"}");
    }

    @Operation(summary = "Login user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in successfully"),
            @ApiResponse(responseCode = "401", description = "Invalid username or password", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthenticationRequestDto authenticationRequest, HttpServletRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.UNAUTHORIZED.value(),
                    "INVALID_CREDENTIALS",
                    "Invalid username or password",
                    request.getRequestURI()
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        long expiration = jwtTokenUtil.getExpirationDateFromToken(jwt).getTime();

        return ResponseEntity.ok(new AuthenticationResponseDto(jwt, expiration));
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token refreshed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid token", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<?> refreshToken(@RequestBody String token, HttpServletRequest request) {
        try {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            long expiration = jwtTokenUtil.getExpirationDateFromToken(refreshedToken).getTime();
            return ResponseEntity.ok(new AuthenticationResponseDto(refreshedToken, expiration));
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "INVALID_TOKEN",
                    "Invalid token",
                    request.getRequestURI()
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
}
