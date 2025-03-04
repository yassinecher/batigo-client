package com.batigobackend.batigo.Controller;

import com.batigobackend.batigo.Entity.User;
import com.batigobackend.batigo.Model.ChangePasswordRequest;
import com.batigobackend.batigo.Model.UserResponse;
import com.batigobackend.batigo.Service.AuthenticationService;
import com.batigobackend.batigo.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> getUser(HttpServletRequest request) {
        var user = authenticationService.getUser(request);
        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())  // Set user ID
                .email(user.getEmail())  // Set email
                .lastname(user.getLastname())
                .firstname(user.getFirstname())
                .gender(user.getGender())
                .phoneNumber(user.getPhoneNumber())
                .profilePicture(user.getProfilePicture())
                .role(user.getRole())
                .status(user.getStatus())
                .build();

        return ResponseEntity.ok(userResponse);
    }
    @GetMapping("all")
    public ResponseEntity<List<UserResponse>> getUsers(HttpServletRequest request) {
        List<User> users = userService.getUsers(request); // Get list of users

        List<UserResponse> userResponses = users.stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .lastname(user.getLastname())
                        .firstname(user.getFirstname())
                        .gender(user.getGender())
                        .phoneNumber(user.getPhoneNumber())
                        .profilePicture(user.getProfilePicture())
                        .role(user.getRole())
                        .status(user.getStatus())
                        .build())
                .toList(); // Convert to List<UserResponse>

        return ResponseEntity.ok(userResponses);
    }


    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
}
