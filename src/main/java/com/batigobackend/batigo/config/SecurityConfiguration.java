package com.batigobackend.batigo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration  {

    private static final String[] WHITE_LIST_URL = {"/api/v1/auth","/api/v1/offres","/api/v1/offres/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html",
            "/api/offres","/api/v1/search/suggestions","/api/v1/auth/admin/authenticate","/api/v1/auth/register","/api/v1/auth/authenticate","/api/v1/auth/forgot-password","/api/v1/auth/reset"

    };

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req.anyRequest().permitAll()); // Désactive la sécurité pour tous les endpoints
        return http.build();
/*        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(request -> {
                    var corsConfig = new CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:4200", "http://localhost:4201", "https://admin.oscarrecrutement.tn","https://oscarrecrutement.tn"));
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfig.setAllowedHeaders(List.of("Content-Type", "Authorization")); // Specify headers you expect
                    corsConfig.setAllowCredentials(true);
                    return corsConfig;
                }))
                .authorizeHttpRequests(req -> req
                   .requestMatchers(WHITE_LIST_URL).permitAll()
                        .requestMatchers("/batigo/Commande/Allcommande").permitAll()
                        .requestMatchers("/batigo/Commande/Allcommande").hasRole("ADMIN")
                        .requestMatchers("/batigo/Commande/Allcommande").authenticated()
                        /*.requestMatchers("/api/v1/management/**").hasAnyRole(ADMIN.name(), EMPLOYER.name())
                        /*.requestMatchers("/api/v1/management/**").hasAnyRole(ADMIN.name(), EMPLOYER.name())
                        .requestMatchers(GET, "/api/v1/management/**").hasAnyAuthority(ADMIN_READ.name(), EMPLOYEUR_READ.name())
                        .requestMatchers(POST, "/api/v1/management/**").hasAnyAuthority(ADMIN_CREATE.name(), EMPLOYEUR_CREATE.name())
                        .requestMatchers(PUT, "/api/v1/management/**").hasAnyAuthority(ADMIN_UPDATE.name(), EMPLOYEUR_UPDATE.name())
                        .requestMatchers(DELETE, "/api/v1/management/**").hasAnyAuthority(ADMIN_DELETE.name(), EMPLOYEUR_DELETE.name())

                        .requestMatchers("/api/v1/auth/admin/**").hasAnyRole(ADMIN.name(), EMPLOYER.name())
                        .requestMatchers(GET, "/api/v1/auth/admin/**").hasAnyAuthority(ADMIN_READ.name(), EMPLOYEUR_READ.name())
                        .requestMatchers(POST, "/api/v1/auth/admin/**").hasAnyAuthority(ADMIN_CREATE.name(), EMPLOYEUR_CREATE.name())
                        .requestMatchers(PUT, "/api/v1/auth/admin/**").hasAnyAuthority(ADMIN_UPDATE.name(), EMPLOYEUR_UPDATE.name())
                        .requestMatchers(DELETE, "/api/v1/auth/admin/**").hasAnyAuthority(ADMIN_DELETE.name(), EMPLOYEUR_DELETE.name())

                        .requestMatchers("/api/v1/users").hasAnyRole(ADMIN.name(), EMPLOYER.name(), USER.name())
                        .requestMatchers(GET, "/api/v1/users").hasAnyAuthority(ADMIN_READ.name(), EMPLOYEUR_READ.name(),USER.name())
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutUrl("/api/v1/auth/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                );

        return http.build();*/
    }

}
