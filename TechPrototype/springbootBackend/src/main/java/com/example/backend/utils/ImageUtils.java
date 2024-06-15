package com.example.backend.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.OutputStream;

public class ImageUtils {
    public static void saveFileToImage(MultipartFile file, String imgFilePath) {
        try {
            OutputStream out = new FileOutputStream(imgFilePath);
            out.write(file.getBytes());
            out.flush();
            out.close();
        } catch (Exception e) {
            System.out.println("You failed to upload " + e.getMessage());
        }
    }
}
