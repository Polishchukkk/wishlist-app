package org.example.wishlist.servise;

import  org.example.wishlist.dto.GiftDto;
import  org.example.wishlist.entity.Gift;
import org.example.wishlist.entity.User;
import org.example.wishlist.repository.GiftRepository;
import  org.example.wishlist.repository.UserRepository;
import  org.example.wishlist.strategy.ReservationStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GiftService {
    private final GiftRepository gifts;
    private final UserRepository users;
    private final ReservationStrategy reservationStrategy;

    public List<Gift> getMyGifts(User owner) {
        return gifts.findByOwner(owner);
    }

    public Gift addGift(User owner, GiftDto dto) {
        Gift gift = Gift.builder()
                .owner(owner)
                .title(dto.getTitle())
                .link(dto.getLink())
                .image(dto.getImage())
                .build();
        return gifts.save(gift);
    }

    public void deleteGift(Long id, User owner) {
        Gift gift = gifts.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gift not found"));

        if (!gift.getOwner().getId().equals(owner.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete this gift");
        }

        gifts.delete(gift);
    }

    public Gift editGift(Long id, GiftDto dto, User owner) {
        Optional<Gift> optional = gifts.findById(id);
        if (optional.isPresent()) {
            Gift gift = optional.get();
            if (gift.getOwner().equals(owner)) {
                gift.setTitle(dto.getTitle());
                gift.setLink(dto.getLink());
                gift.setImage(dto.getImage());
                return gifts.save(gift);
            }
        }
        throw new RuntimeException("Unauthorized");
    }

    public List<Gift> getPublicGifts(Long ownerId) {
        User user = users.findById(ownerId).orElseThrow();
        return gifts.findByOwner(user);
    }

    public Gift reserveGift(Long id, User reserver) {
        Gift gift = gifts.findById(id).orElseThrow();
        reservationStrategy.applyReservationRule(gift, reserver);
        gift.setReservedBy(reserver);
        return gifts.save(gift);
    }
}

