package br.dev.nathan.financy.controllers;

import br.dev.nathan.financy.config.JWTUserData;
import br.dev.nathan.financy.dtos.request.UserNameRequest;
import br.dev.nathan.financy.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/financy/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping("/name")
    public ResponseEntity<Void> changeName(@AuthenticationPrincipal JWTUserData userData, @Valid @RequestBody UserNameRequest request) {

        UUID userId = userData.userId();
        String name = request.name();

        userService.changeName(userId, name);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
