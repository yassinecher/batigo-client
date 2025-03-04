package com.batigobackend.batigo.Controller;

import com.batigobackend.batigo.Entity.User;
import com.batigobackend.batigo.Model.*;
import com.batigobackend.batigo.Repository.UserRepository;
import com.batigobackend.batigo.Service.AuthenticationService;
import com.batigobackend.batigo.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200, http://localhost:54130")
public class AuthenticationController {

  private final AuthenticationService service;
  // New endpoint to find all users
  private final UserRepository userRepository;
  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    // Check if the user already exists based on their email
    Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

    if (existingUser.isPresent()) {
      // Return a message indicating the user is already registered
      return ResponseEntity.badRequest().body("L'utilisateur avec l'adresse e-mail " + request.getEmail() + " est déjà inscrit.");
    }

    // Proceed with the registration process if the user doesn't exist
    AuthenticationResponse response = service.register(request);
    return ResponseEntity.ok(response);
  }


  @PostMapping("/forgot-password")
  public ResponseEntity<?> forgotPassword(
          @RequestBody ForgotPasswordModel request
  ) {
    String email=request.getEmail();
    if(email ==null || email.length()==0){
      return ResponseEntity.badRequest().body("L'adresse e-mail est requise.");
    }
    if(  !userService.findUserByEmail(email)){
      return ResponseEntity.badRequest().body("Aucun utilisateur avec l'adresse e-mail .");
    }
    service.sendResetEmail(email);
    Map<String, String> response = new HashMap<>();
    response.put("message", "Password reset email sent.");
    return ResponseEntity.ok(response);

  }
  @PostMapping("/authenticate")
  public ResponseEntity<?> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    try {
      return ResponseEntity.ok(service.authenticate(request));
    }catch (Exception e) {
      Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

      if (existingUser.isPresent()) {
        // Return a message indicating the user is already registered
        return ResponseEntity.badRequest().body("Mot de passe incorrect.");
      }
      return ResponseEntity.badRequest().body("Aucun utilisateur avec l'adresse e-mail.");
    }

  }
  @PostMapping("/admin/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticateadmin(
          @RequestBody AuthenticationRequest request
  ) {

try {
 return ResponseEntity.ok(service.authenticateAdmin(request));
} catch (IOException e) {
   return ResponseEntity.badRequest().build();
}

  }

  @PostMapping("/Employeur/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticateEmployeur(
          @RequestBody AuthenticationRequest request
  ) {

    try {
      return ResponseEntity.ok(service.authenticateAdmin(request));
    } catch (IOException e) {
      return ResponseEntity.badRequest().build();
    }

  }
  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


  @GetMapping("/validate-token")
  public ResponseEntity<?> validateToken(@RequestParam String token) {
    boolean isValid = service.validateToken(token);
    return isValid ? ResponseEntity.ok("Token is valid.") : ResponseEntity.badRequest().body("Invalid token.");
  }

  @PostMapping("/reset")
  public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {

    boolean isValid = service.validateToken(request.getToken());
    if(!isValid){
      return ResponseEntity.badRequest().body("Invalid token.");
    }
try {
  service.resetPassword(request.getToken(), request.getNewPassword());
} catch (Exception e) {
  return ResponseEntity.badRequest().body(e.getMessage());
}

    Map<String, String> response = new HashMap<>();
    response.put("message", "Password reset successful.");
    return ResponseEntity.ok(response);
  }
}
