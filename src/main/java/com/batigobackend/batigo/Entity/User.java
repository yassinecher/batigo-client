package com.batigobackend.batigo.Entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@Getter
@Setter
@SuperBuilder
public class User implements UserDetails {

  @Id
  @GeneratedValue
  private Integer id;
  private String email;
  private String password;
  private String phoneNumber;
  private String profilePicture="assets/images/avatar.png";
  private String cover;
  private String firstname;
  private String lastname;
  private String gender;
  @Enumerated(EnumType.STRING)
  private UserStatus status =UserStatus.INACTIVE ;
  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Token> tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
