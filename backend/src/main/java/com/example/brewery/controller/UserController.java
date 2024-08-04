package com.example.brewery.controller;

import com.example.brewery.dto.AuthenticationRequestDto;
import com.example.brewery.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface UserController {

    ResponseEntity<?> registerUser(@RequestBody UserDto userDto, HttpServletRequest request);

    ResponseEntity<?> loginUser(@RequestBody AuthenticationRequestDto authenticationRequest, HttpServletRequest request);

    ResponseEntity<?> refreshToken(@RequestBody String token, HttpServletRequest request);
}
