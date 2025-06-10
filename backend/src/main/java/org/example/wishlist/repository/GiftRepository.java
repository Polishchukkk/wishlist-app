package org.example.wishlist.repository;


import org.example.wishlist.entity.Gift;
import org.example.wishlist.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GiftRepository extends JpaRepository<Gift, Long> {
    List<Gift> findByOwner(User owner);
}