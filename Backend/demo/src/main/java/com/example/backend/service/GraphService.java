package com.example.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class GraphService {

    private final FileService fileService;
    
    public GraphService(FileService fileService) {
        this.fileService = fileService;
    }

    public void graphReader() {
        try {
            List<String> lines = fileService.readFile("Backend/demo/src/main/resources/data.txt");

            for (String line : lines) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }

    // public void graphWriter() {

    // }
}
