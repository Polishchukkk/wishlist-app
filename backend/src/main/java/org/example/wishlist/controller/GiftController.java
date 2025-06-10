package org.example.wishlist.controller;

import org.example.wishlist.dto.GiftDto;
import org.example.wishlist.entity.Gift;
import org.example.wishlist.entity.User;
import lombok.RequiredArgsConstructor;
import org.example.wishlist.servise.GiftService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gifts")
@RequiredArgsConstructor
public class GiftController {
    private final GiftService gifts;

    @GetMapping
    public List<Gift> list(@AuthenticationPrincipal User user) {
        return gifts.getMyGifts(user);
    }

    @PostMapping
    public Gift add(@AuthenticationPrincipal User user, @RequestBody GiftDto dto) {
        return gifts.addGift(user, dto);
    }

    @PutMapping("/{id}")
    public Gift edit(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody GiftDto dto) {
        return gifts.editGift(id, dto, user);
    }

    @DeleteMapping("/{id}")
    public void delete(@AuthenticationPrincipal User user, @PathVariable Long id) {
        gifts.deleteGift(id, user);
    }

    @GetMapping("/public/{ownerId}")
    public List<Gift> publicList(@PathVariable Long ownerId) {
        return gifts.getPublicGifts(ownerId);
    }

    @PostMapping("/{id}/reserve")
    public Gift reserve(@AuthenticationPrincipal User user, @PathVariable Long id) {
        return gifts.reserveGift(id, user);
    }
}
