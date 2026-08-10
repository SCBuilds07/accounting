package com.example.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class FileService {

    public List<String> readFile(String filePath) throws IOException {
        return Files.readAllLines(Path.of(filePath));
    }

    public void appendToFile(String filePath, String text) throws IOException {
        Files.write(
            Path.of(filePath),
            List.of(text),
            StandardOpenOption.APPEND
        );
    }
}