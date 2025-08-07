# 1. Базовый образ с JDK 17
FROM eclipse-temurin:17-jdk-alpine

# 2. Создаем рабочую директорию внутри контейнера
WORKDIR /app

# 3. Копируем jar файл внутрь контейнера
COPY target/space-sql-0.0.1-SNAPSHOT.jar app.jar

# 4. Открываем порт (на Vercel это не критично, но пусть будет)
EXPOSE 8080

# 5. Команда запуска приложения
ENTRYPOINT ["java", "-jar", "app.jar"]
