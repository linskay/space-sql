package com.spacesql.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsGlobalConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Для разработки - разрешаем все
                if (System.getProperty("spring.profiles.active", "").contains("dev")) {
                    registry.addMapping("/**")
                            .allowedOrigins("http://localhost:3000", "http://localhost:8080")
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                            .allowedHeaders("*")
                            .allowCredentials(true);
                } else {
                    // Для продакшена - более строгие настройки
                    registry.addMapping("/api/**")
                            .allowedOrigins("https://your-production-domain.com")
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                            .allowedHeaders("*")
                            .allowCredentials(true);
                }
            }
        };
    }
}
