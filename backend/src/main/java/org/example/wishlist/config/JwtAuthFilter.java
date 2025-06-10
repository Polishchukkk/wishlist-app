package org.example.wishlist.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.wishlist.entity.User;
import org.example.wishlist.servise.JwtUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final JwtUserDetailsService uds;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, jakarta.servlet.ServletException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        System.out.println("Authorization header: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("Authorization header is missing or invalid.");
            chain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        System.out.println("Extracted JWT: " + jwt);

        userEmail = jwtUtil.extractUsername(jwt);
        System.out.println("Extracted username from JWT: " + userEmail);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                User user = (User) uds.loadUserByUsername(userEmail);
                System.out.println("User loaded from DB: " + user.getEmail());

                boolean isValid = jwtUtil.isTokenValid(jwt, user);
                System.out.println("Is token valid: " + isValid);

                if (isValid) {
                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());
                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(token);

                    System.out.println("Authentication successful. SecurityContext updated.");
                } else {
                    System.out.println("Token validation failed.");
                }
            } catch (Exception e) {
                System.out.println("Exception in JwtAuthFilter: " + e.getMessage());
            }
        } else {
            System.out.println("User email is null or SecurityContext already has authentication.");
        }

        chain.doFilter(request, response);
    }
}
