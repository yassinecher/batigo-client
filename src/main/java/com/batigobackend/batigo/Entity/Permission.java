package com.batigobackend.batigo.Entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    EMPLOYEUR_READ("employer:read"),
    EMPLOYEUR_UPDATE("employer:update"),
    EMPLOYEUR_CREATE("employer:create"),
    EMPLOYEUR_DELETE("employer:delete")

    ;

    @Getter
    private final String permission;
}
