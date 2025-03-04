package com.batigobackend.batigo.Service;
import com.batigobackend.batigo.Model.ChangePasswordRequest;
import com.batigobackend.batigo.Entity.User;
import com.batigobackend.batigo.Repository.UserRepository;
import com.batigobackend.batigo.config.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor

public class UserService {



    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        repository.save(user);
    }
    public void changePasswordForgotten(String password, User connectedUser) {


        // check if the current password is correct
        if (passwordEncoder.matches(password, connectedUser.getPassword())) {
            throw new IllegalStateException("Vous avez choisi le même mot de passe.");
        }


        // update the password
        connectedUser.setPassword(passwordEncoder.encode(password));

        // save the new password
        repository.save(connectedUser);
    }

    private final JwtService jwtService;
    public User getUser(HttpServletRequest request) {
        var client = User.builder().build();
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return client;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.repository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                return user;
            }
        }

        return client;
    }
    public List<User> getUsers(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            var user = repository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (jwtService.isTokenValid(refreshToken, user)) {
                return repository.findAll(); // Return the list of all users
            }
        }

        throw new RuntimeException("Unauthorized access");
    }

    public Boolean findUserByEmail(String email) {
       return repository.findByEmail(email).isPresent();
    }
}
