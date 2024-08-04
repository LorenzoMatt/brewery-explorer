package com.example.brewery.service;

import com.example.brewery.dto.UserDto;
import com.example.brewery.entity.AppUser;
import com.example.brewery.repository.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final AppUserRepository userRepository;

    @Autowired
    public CustomUserDetailsServiceImpl(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Loading user by username: {}", username);
        Optional<AppUser> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> {
            logger.error("User not found: {}", username);
            return new UsernameNotFoundException("Not found: " + username);
        });
        logger.info("User found: {}", username);
        return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(), new ArrayList<>());
    }

    @Override
    public boolean userExists(String username) {
        boolean exists = userRepository.existsByUsername(username);
        logger.info("Checking if user exists: {} - {}", username, exists);
        return exists;
    }

    @Override
    public void saveUser(UserDto userDto) {
        AppUser user = new AppUser();
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        userRepository.save(user);
        logger.info("User saved: {}", userDto.getUsername());
    }
}
