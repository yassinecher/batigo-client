package com.batigobackend.batigo.Model;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String token;
    private String newPassword;
}
