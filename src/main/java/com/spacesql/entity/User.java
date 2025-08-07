package com.spacesql.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Data
@Entity
@Table(name = "users")
@Schema(description = "Сущность пользователя")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Уникальный идентификатор пользователя", example = "1")
    private Long id;

    @Email
    @NotBlank
    @Column(unique = true, nullable = false)
    @Schema(description = "Email пользователя", example = "user@example.com")
    private String email;

    @NotBlank
    @Size(min = 6)
    @Column(nullable = false)
    @Schema(description = "Зашифрованный пароль")
    private String password;

    @Column(unique = true)
    @Schema(description = "Имя пользователя GitHub", example = "octocat")
    private String githubUsername;

    @Schema(description = "URL аватара", example = "https://avatars.githubusercontent.com/u/583231?v=4")
    private String avatarUrl;

    @Schema(description = "Прогресс обучения в баллах", example = "25")
    private int progress;

    @Column(nullable = false)
    private boolean enabled = true;

    // UserDetails methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
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
        return enabled;
    }
}