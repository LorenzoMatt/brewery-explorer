package com.example.brewery.controller;

import com.example.brewery.dto.AuthenticationRequestDto;
import com.example.brewery.dto.AuthenticationResponseDto;
import com.example.brewery.dto.UserDto;
import com.example.brewery.exception.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

public interface UserController {

    ResponseEntity<?> registerUser(@RequestBody UserDto userDto, HttpServletRequest request);

    ResponseEntity<?> loginUser(@RequestBody AuthenticationRequestDto authenticationRequest, HttpServletRequest request);

    ResponseEntity<?> refreshToken(@RequestBody String token, HttpServletRequest request);
}
