package com.batigobackend.batigo.Model;

import com.batigobackend.batigo.Entity.Role;
import com.batigobackend.batigo.Entity.UserStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Integer id;
    private String email;
    private String password;
    private String phoneNumber;
    private String profilePicture="assets/images/avatar.png";
    private String cover;
    private String firstname;
    private String lastname;
    private String gender;
    private UserStatus status;
    private Role role;
}
