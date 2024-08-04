package com.example.brewery.service;

import com.example.brewery.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface CustomUserDetailsService extends UserDetailsService {

    boolean userExists(String username);

    void saveUser(UserDto userDto);
}
