package com.example.backend.service;

import com.example.backend.dao.FileDao;
import com.example.backend.dao.FolderDao;
import com.example.backend.dao.RepoDao;
import com.example.backend.domains.File;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.util.Enumeration;
import java.util.List;

@Service
public class RepoServiceImpl implements RepoService{
    @Autowired
    RepoDao repoDao;

    @Autowired
    FileDao fileDao;

    @Autowired
    FolderDao folderDao;

    public String fileUpload(HttpServletRequest request){
        MultipartHttpServletRequest params=((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String[] users = params.getParameterValues("user");
        String[] repos = params.getParameterValues("repo");
        String[] paths = params.getParameterValues("path");
        MultipartFile file = null;
        BufferedOutputStream stream = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    String basePath = '/' + users[i] + '/' + repos[i];
                    String parentPath = basePath + paths[i].substring(0, paths[i].lastIndexOf("/"));
                    File fileClass = new File(basePath + '/' + paths[i],
                            file.getOriginalFilename(),
                            file.getContentType(),
                            file.getBytes(),
                            folderDao.findOrCreateByPath(parentPath));
                    fileDao.addFile(fileClass);
                } catch (Exception e) {
                    return "You failed to upload " + i + " => "
                            + e.getMessage();
                }
            } else {
                return "You failed to upload " + i
                        + " because the file was empty.";
            }
        }
        return "upload successful";
    }
}
