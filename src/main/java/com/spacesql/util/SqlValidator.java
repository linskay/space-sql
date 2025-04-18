package com.spacesql.util;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class SqlValidator {
    public boolean validateQuery(String expected, String actual) {
        // Простая проверка - нормализуем запросы и сравниваем
        // В реальном приложении нужно более сложное сравнение
        String normalizedExpected = normalizeSql(expected);
        String normalizedActual = normalizeSql(actual);
        return normalizedExpected.equalsIgnoreCase(normalizedActual);
    }

    private String normalizeSql(String sql) {
        return sql.replaceAll("\\s+", " ")
                .replaceAll("(?i)\\bSELECT\\b", "SELECT")
                .replaceAll("(?i)\\bFROM\\b", "FROM")
                .replaceAll("(?i)\\bWHERE\\b", "WHERE")
                .replaceAll("(?i)\\bJOIN\\b", "JOIN")
                .replaceAll("(?i)\\bON\\b", "ON")
                .trim();
    }
}