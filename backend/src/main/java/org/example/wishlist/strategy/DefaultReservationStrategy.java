package org.example.wishlist.strategy;



import org.example.wishlist.entity.Gift;
import org.example.wishlist.entity.User;
import org.springframework.stereotype.Component;

@Component
public class DefaultReservationStrategy implements ReservationStrategy {
    @Override
    public void applyReservationRule(Gift gift, User reserver) {
        if (gift.getOwner().equals(reserver)) {
            throw new RuntimeException("Cannot reserve your own gift.");
        }
        if (gift.getReservedBy() != null) {
            throw new RuntimeException("Gift already reserved.");
        }
    }
}