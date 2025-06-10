package org.example.wishlist.dto;

import lombok.Data;

@Data
public class GiftDto {
    private Long id;
    private String title;
    private String link;
    private String image;
    private Long reservedById;
}