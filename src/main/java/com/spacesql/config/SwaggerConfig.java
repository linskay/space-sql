package com.spacesql.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@io.swagger.v3.oas.annotations.security.SecurityScheme(
        name = "bearerAuth",
        type = io.swagger.v3.oas.annotations.enums.SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
@io.swagger.v3.oas.annotations.OpenAPIDefinition(
        info = @io.swagger.v3.oas.annotations.info.Info(
                title = "Space SQL API",
                version = "1.0.0",
                description = "API documentation for Space SQL application",
                contact = @io.swagger.v3.oas.annotations.info.Contact(
                        name = "Space SQL Team",
                        email = "support@spacesql.com"
                )
        )
)
public class SwaggerConfig {

    @Bean
    public OpenAPI spaceSqlOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Space SQL API")
                        .description("API для платформы изучения SQL")
                        .version("v1.0.0")
                        .license(new License().name("Apache 2.0").url("https://springdoc.org")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes("bearerAuth", 
                                new io.swagger.v3.oas.models.security.SecurityScheme()
                                        .name("bearerAuth")
                                        .type(io.swagger.v3.oas.models.security.SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
    
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public-apis")
                .packagesToScan("com.spacesql.controller")
                .pathsToMatch(
                    "/api/**",
                    "/v3/api-docs/**"
                )
                .build();
    }
    
    @Bean
    public GroupedOpenApi authApi() {
        return GroupedOpenApi.builder()
                .group("authentication")
                .packagesToScan("com.spacesql.controller.auth")
                .pathsToMatch("/api/auth/**")
                .build();
    }
    
    @Bean
    public GroupedOpenApi allApis() {
        return GroupedOpenApi.builder()
                .group("all-apis")
                .packagesToScan("com.spacesql")
                .pathsToMatch("/**")
                .build();
    }
}