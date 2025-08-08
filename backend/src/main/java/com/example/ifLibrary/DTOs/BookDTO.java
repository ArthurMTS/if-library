package com.example.ifLibrary.DTOs;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record BookDTO(
    @NotEmpty String title,
    @NotNull String headerImage,
    @NotNull String blogLink,
    @NotEmpty String playLink,
    @NotNull String[] tags,
    @NotNull boolean finished
) {}
