package com.spacesql.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.OAuthFlow;
import io.swagger.v3.oas.annotations.security.OAuthFlows;
import io.swagger.v3.oas.annotations.security.OAuthScope;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "github-oauth",
        type = SecuritySchemeType.OAUTH2,
        flows = @OAuthFlows(
                authorizationCode = @OAuthFlow(
                        authorizationUrl = "${spring.security.oauth2.client.provider.github.authorization-uri}",
                        tokenUrl = "${spring.security.oauth2.client.provider.github.token-uri}",
                        scopes = {@OAuthScope(
                                name = "read:user",
                                description = "Доступ к информации о пользователе"
                        )})))

public class SwaggerConfig {

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String clientId;

    @Bean
    public OpenAPI spaceSqlOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Space SQL API")
                        .description("API для платформы изучения SQL")
                        .version("v1.0.0")
                        .license(new License().name("Apache 2.0").url("https://springdoc.org")))
                .addSecurityItem(new SecurityRequirement().addList("github-oauth"));
    }
}