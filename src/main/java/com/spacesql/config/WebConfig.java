package com.spacesql.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static files from frontend build directory
        String frontendBuildPath = Paths.get("frontend", "build").toAbsolutePath().toString();
        
        registry
            .addResourceHandler("/**")
            .addResourceLocations(
                "classpath:/static/",
                "classpath:/public/",
                "file:" + frontendBuildPath + "/"
            )
            .setCachePeriod(0);
            
        // This serves the frontend's index.html for all routes except /api/**
        registry
            .addResourceHandler("/**")
            .addResourceLocations("classpath:/static/index.html")
            .resourceChain(true);
    }
}
