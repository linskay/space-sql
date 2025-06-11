package com.spacesql.util;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.*;

@Component
@AllArgsConstructor
public class SqlValidator {
    private static final List<String> SQL_KEYWORDS = List.of(
            "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT",
            "FULL", "OUTER", "ON", "GROUP BY", "ORDER BY", "HAVING",
            "LIMIT", "OFFSET", "INSERT", "UPDATE", "DELETE", "CREATE",
            "ALTER", "DROP", "TABLE", "AND", "OR", "NOT", "IN", "BETWEEN",
            "LIKE", "IS NULL", "IS NOT NULL", "DISTINCT", "AS", "COUNT",
            "SUM", "AVG", "MIN", "MAX"
    );

    private final javax.sql.DataSource dataSource;

    /**
     * Выполняет оба запроса и сравнивает их результаты.
     * @param expected эталонный SQL-запрос
     * @param actual пользовательский SQL-запрос
     * @return true, если результаты совпадают
     */
    public boolean validateQuery(String expected, String actual) {
        try (Connection conn = dataSource.getConnection()) {
            List<Map<String, Object>> expectedResult = executeQuery(conn, expected);
            List<Map<String, Object>> actualResult = executeQuery(conn, actual);
            return compareResults(expectedResult, actualResult);
        } catch (Exception e) {
            return false;
        }
    }

    private List<Map<String, Object>> executeQuery(Connection conn, String sql) throws SQLException {
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            ResultSetMetaData meta = rs.getMetaData();
            int columnCount = meta.getColumnCount();
            List<Map<String, Object>> result = new ArrayList<>();
            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(meta.getColumnLabel(i), rs.getObject(i));
                }
                result.add(row);
            }
            return result;
        }
    }

    private boolean compareResults(List<Map<String, Object>> r1, List<Map<String, Object>> r2) {
        if (r1.size() != r2.size()) return false;
        for (int i = 0; i < r1.size(); i++) {
            if (!r1.get(i).equals(r2.get(i))) return false;
        }
        return true;
    }
}