package org.example.wishlist.strategy;

import org.example.wishlist.entity.Gift;
import org.example.wishlist.entity.User;

public interface ReservationStrategy {
    void applyReservationRule(Gift gift, User reserver);
}
