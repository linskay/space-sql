package com.spacesql.util;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class SqlValidator {
    private static final List<String> SQL_KEYWORDS = List.of(
            "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT",
            "FULL", "OUTER", "ON", "GROUP BY", "ORDER BY", "HAVING",
            "LIMIT", "OFFSET", "INSERT", "UPDATE", "DELETE", "CREATE",
            "ALTER", "DROP", "TABLE", "AND", "OR", "NOT", "IN", "BETWEEN",
            "LIKE", "IS NULL", "IS NOT NULL", "DISTINCT", "AS", "COUNT",
            "SUM", "AVG", "MIN", "MAX"
    );

    public boolean validateQuery(String expected, String actual) {
        String normalizedExpected = normalizeSql(expected);
        String normalizedActual = normalizeSql(actual);

        boolean exactMatch = normalizedExpected.equalsIgnoreCase(normalizedActual);

        boolean sameKeywords = compareKeywords(normalizedExpected, normalizedActual);

        return exactMatch || sameKeywords;
    }

    public String normalizeSql(String sql) {
        if (sql == null) return "";

        String noComments = sql.replaceAll("--.*|/\\*.*?\\*/", "");

        String normalized = noComments.replaceAll("\\s+", " ");
        for (String keyword : SQL_KEYWORDS) {
            normalized = normalized.replaceAll(
                    "(?i)\\b" + Pattern.quote(keyword) + "\\b",
                    keyword.toUpperCase()
            );
        }

        return normalized.trim();
    }

    private boolean compareKeywords(String expected, String actual) {
        List<String> expectedKeywords = extractKeywords(expected);
        List<String> actualKeywords = extractKeywords(actual);

        return expectedKeywords.equals(actualKeywords);
    }

    private List<String> extractKeywords(String sql) {
        return Arrays.stream(sql.split("\\s+"))
                .map(String::toUpperCase)
                .filter(SQL_KEYWORDS::contains)
                .collect(Collectors.toList());
    }

    // Дополнительные методы проверки можно добавить здесь
}