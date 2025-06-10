package org.example.wishlist.controller;


import org.example.wishlist.dto.AuthRequest;
import org.example.wishlist.dto.AuthResponse;
import org.example.wishlist.dto.RegisterRequest;
import org.example.wishlist.entity.User;
import org.example.wishlist.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.example.wishlist.servise.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService users;
    private final AuthenticationManager auth;
    private final JwtUtil jwt;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody @Valid RegisterRequest dto) {
        User user = users.register(dto);
        return new AuthResponse(jwt.tokenFor(user));
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
        Authentication authentication = auth.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        return new AuthResponse(jwt.tokenFor((User) authentication.getPrincipal()));
    }
}
