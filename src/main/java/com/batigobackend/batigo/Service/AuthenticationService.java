package com.batigobackend.batigo.Service;

import com.batigobackend.batigo.Entity.*;
import com.batigobackend.batigo.Model.AuthenticationRequest;
import com.batigobackend.batigo.Model.AuthenticationResponse;
import com.batigobackend.batigo.Model.RegisterRequest;
import com.batigobackend.batigo.Repository.PasswordResetTokenRepository;
import com.batigobackend.batigo.Repository.TokenRepository;
import com.batigobackend.batigo.Repository.UserRepository;
import com.batigobackend.batigo.config.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
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
  public AuthenticationResponse register(RegisterRequest request) {
    var client = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .phoneNumber(request.getPhoneNumber())
            .profilePicture("assets/images/avatar.png")
            .gender(request.getGender())
            .role(Role.USER)  // Make sure Role is correctly set
            .build();
    System.out.println("user: " + client.getFirstname());
    var savedUser = repository.save(client);
    var jwtToken = jwtService.generateToken(client);
    var refreshToken = jwtService.generateRefreshToken(client);
    saveUserTokenUser( savedUser, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );
    var user = repository.findByEmail(request.getEmail())
            .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokensUser( user);
    saveUserTokenUser( user, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }
  public AuthenticationResponse authenticateAdmin(AuthenticationRequest request)throws IOException {

    var user = repository.findByEmail(request.getEmail())
            .orElseThrow();
    
    if(user.getRole() == Role.ADMIN) {
      var jwtToken = jwtService.generateToken(user);
      var refreshToken = jwtService.generateRefreshToken(user);
      revokeAllUserTokensUser( user);
      saveUserTokenUser( user, jwtToken);
      return AuthenticationResponse.builder()
              .accessToken(jwtToken)
              .refreshToken(refreshToken)
              .build();
    }else {
      throw  new IOException();
    }

  }
  private void saveUserTokenUser(User user, String jwtToken) {
    var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
    tokenRepository.save(token);
  }


  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }
  private void revokeAllUserTokensUser(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }
  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens((User) user);
        saveUserTokenUser((User) user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }



  @Autowired
  private JwtService jwtTokenProvider;

  private final PasswordResetTokenRepository passwordResetTokenRepository;

  @Autowired
  private final JavaMailSender mailSender;
  private final UserRepository userRepository;

  public void sendResetEmail(String email) {
    String token = UUID.randomUUID().toString();
    LocalDateTime expiryDate = LocalDateTime.now().plusHours(1);

    PasswordResetToken resetToken = new PasswordResetToken();
    resetToken.setEmail(email);
    resetToken.setToken(token);
    resetToken.setExpiryDate(expiryDate);
    passwordResetTokenRepository.save(resetToken);

    String resetLink = "http://Batigo.tn/reset-password?resetToken=" + token;
    sendResetPasswordEmail(email,email, resetLink);
  }

  private void sendResetPasswordEmail(String toEmail, String name, String resetLink) {
    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

      helper.setTo(toEmail);
      helper.setSubject("Réinitialisez votre mot de passe - Batigo");

      String htmlContent = getResetPasswordHtmlContent(name, resetLink);
      helper.setText(htmlContent, true);

      mailSender.send(mimeMessage);
    } catch (Exception e) {
      throw new RuntimeException("Failed to send reset password email", e);
    }
  }


  public boolean validateToken(String token) {
    Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepository.findByToken(token);
    if (tokenOpt.isEmpty()) {
      return false;
    }

    PasswordResetToken resetToken = tokenOpt.get();
    return resetToken.getExpiryDate().isAfter(LocalDateTime.now());
  }
  final  UserService userService;

  public void resetPassword(String token, String newPassword) throws MessagingException {
    Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepository.findByToken(token);
    if (tokenOpt.isPresent()) {
      PasswordResetToken resetToken = tokenOpt.get();
      if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
        throw  new RuntimeException("Token expirée");
      }
      String email = resetToken.getEmail();
      User user = userRepository.findByEmail(email).orElse(null);
      userService.changePasswordForgotten(newPassword ,user);
      resetToken.setExpiryDate(LocalDateTime.now().minusHours(100));
      // Update user's password (e.g., using UserRepository)
      // Hash the new password before saving
    }
  }
  private String getResetPasswordHtmlContent(String name, String resetLink) {
    return """
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisez votre mot de passe - Batigo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #1967d2;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            color: black !important;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #1967d2;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin-bottom: 15px;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 10px 15px;
            background-color: #1967d2;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            background-color: #1967d2;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #ffffff;;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Réinitialisation de votre mot de passe</h1>
        </div>
        <div class="content">
            <p>Bonjour %s,</p>
            <p>Nous avons reçu une demande pour réinitialiser votre mot de passe. Si cette demande vient bien de vous, cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :</p>
            <a href="%s" class="button">Réinitialiser mon mot de passe</a>
            <p>Ce lien est valable pendant 1 heure. Si vous n'avez pas fait cette demande, ignorez cet email.</p>
            <p>Pour toute question, veuillez nous contacter à <a href="mailto:Batigotn@gmail.com">Batigotn@gmail.com</a>.</p>
            <p>Cordialement,<br>L'équipe Batigo</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Batigo. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
""".formatted(name, resetLink);


  }

}
