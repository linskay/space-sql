package com.spacesql.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.hibernate.type.format.jackson.JacksonJsonFormatMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
        ObjectMapper objectMapper = builder.createXmlMapper(false).build();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper;
    }

    @Bean
    public JacksonJsonFormatMapper jacksonJsonFormatMapper(ObjectMapper objectMapper) {
        return new JacksonJsonFormatMapper(objectMapper);
    }
}