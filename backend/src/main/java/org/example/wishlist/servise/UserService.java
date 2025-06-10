package org.example.wishlist.servise;

import org.example.wishlist.dto.RegisterRequest;
import org.example.wishlist.entity.Role;
import org.example.wishlist.entity.User;
import org.example.wishlist.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterRequest req) {
        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(Role.USER)
                .build();
        return users.save(user);
    }
}
