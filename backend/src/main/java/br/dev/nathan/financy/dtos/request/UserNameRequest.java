package br.dev.nathan.financy.dtos.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record UserNameRequest(

    @NotEmpty(message = "Name is required.")
    @Size(max = 50, message = "The maximum name size is 50 characters.")
    String name

) {}
