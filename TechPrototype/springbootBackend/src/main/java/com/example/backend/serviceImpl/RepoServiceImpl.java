package com.example.backend.serviceImpl;

import com.example.backend.DTOs.*;
import com.example.backend.dao.FileDao;
import com.example.backend.dao.FolderDao;
import com.example.backend.dao.RepoDao;
import com.example.backend.dao.UserDao;
import com.example.backend.domains.File;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import com.example.backend.domains.User;
import com.example.backend.service.RepoService;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.sql.rowset.serial.SerialBlob;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RepoServiceImpl implements RepoService {
    @Autowired
    RepoDao repoDao;

    @Autowired
    FileDao fileDao;

    @Autowired
    FolderDao folderDao;

    @Autowired
    UserService loginService;

    @Autowired
    UserDao userDao;

    @Override
    public String fileUpload(HttpServletRequest request){
        MultipartHttpServletRequest params=((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String[] users = params.getParameterValues("user");
        String[] repos = params.getParameterValues("repo");
        String[] paths = params.getParameterValues("path");
        MultipartFile file = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    String basePath = '/' + users[i] + '/' + repos[i];
                    String parentPath = basePath + "/" + paths[i].substring(0, paths[i].lastIndexOf("/"));
                    System.out.println(basePath + "+" + parentPath);
                    File fileClass = new File(basePath + '/' + paths[i],
                            file.getOriginalFilename(),
                            file.getContentType(),
                            file.getSize(),
                            new SerialBlob(file.getBytes()),
                            folderDao.findOrCreateByPath(parentPath));
                    fileDao.addFile(fileClass);
                } catch (Exception e) {
                    System.out.println("You failed to upload " + i + " => "
                            + e.getMessage());
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

    @Override
    public Repo getRepo(GetRepoDTO repoDTO){
        if(loginService.checkAccount(repoDTO.getUserDTO())){
            return repoDao.findByPath(repoDTO.getPath());
        }
        else{
            Repo repo = repoDao.findByPath(repoDTO.getPath());
            if(repo.isPublish() == false)
                return null;
            else{
                return repo;
            }
        }
    }

    @Override
    public Folder getFolder(GetRepoDTO getRepoDTO){
        if(loginService.checkAccount(getRepoDTO.getUserDTO())){
                return folderDao.findByPath(getRepoDTO.getPath());
        }
        else{
            Repo repo = repoDao.findByPath(getRepoDTO.getPath());
            if(repo.isPublish() == false)
                return null;
            else{
                return folderDao.findByPath(getRepoDTO.getPath());
            }
        }
    }

    @Override
    public FileDTO getFile(GetRepoDTO getRepoDTO) {
        if(loginService.checkAccount(getRepoDTO.getUserDTO()) || repoDao.findByPath(getRepoDTO.getPath()).isPublish()){
            File file = fileDao.findByPath(getRepoDTO.getPath());
            Blob blob = file.getContent();
            try {
                InputStream stream = blob.getBinaryStream();
                byte[] bytes = new byte[(int)blob.length()];
                stream.read(bytes);
                String str = new String(bytes);
                return new FileDTO(file.getType(), file.getName(), file.getPath(), str);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        else{
            return null;
        }
    }

    @Override
    public void downloadFile(GetRepoDTO getRepoDTO, HttpServletResponse response) {
        if(loginService.checkAccount(getRepoDTO.getUserDTO()) || repoDao.findByPath(getRepoDTO.getPath()).isPublish()){
            File file = fileDao.findByPath(getRepoDTO.getPath());
            Blob blob = file.getContent();
            response.setCharacterEncoding("utf-8");
            response.setContentType(file.getType());
            response.setHeader("Content-Disposition", file.getName());//文件名
            response.setHeader("Access-Control-Expose-Headers","Content-Disposition");
            try {
                InputStream inputStream = blob.getBinaryStream();
                OutputStream outputStream = response.getOutputStream();
                IOUtils.copy(inputStream, outputStream);
                outputStream.flush();
                outputStream.close();
                inputStream.close();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public List<Repo> getAllPublicRepos(){
        return repoDao.findAllPublic();
    }

    @Override
    public List<Repo> getAllByUser(String name){
        return repoDao.findAllByUser(userDao.getByName(name));
    }

    @Override
    public Boolean createRepo(CreateRepoDTO repoDTO){
        if(loginService.checkAccount(repoDTO.getUser())){
            if(repoDao.checkByPath(repoDTO.getPath()))
                return false;
            else{
                repoDao.createByRepoDTO(repoDTO);
                return true;
            }
        }
        else return false;
    }

    @Override
    public Boolean changeStar(GetRepoDTO getRepoDTO){
        if(loginService.checkAccount(getRepoDTO.getUserDTO())){
            if(repoDao.checkByPath(getRepoDTO.getPath())){
                Repo repo = repoDao.findByPath(getRepoDTO.getPath());
                User user = userDao.getByName(getRepoDTO.getUserDTO().getName());
                System.out.println(user);
                if(user.getStarRepositoryList().contains(repo)){
                    userDao.removeStar(repo, user);
                    repoDao.removeStar(repo);
                }
                else{
                    userDao.addStar(repo, user);
                    repoDao.addStar(repo);
                }
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Repo> getRepoByNameDateLabelUser(NameDateLabelUserDTO nameDateLabelUserDTO){
        return repoDao.getRepoByNameDateLabelUser(nameDateLabelUserDTO.getName(), nameDateLabelUserDTO.getBegin(),
                nameDateLabelUserDTO.getEnd(), nameDateLabelUserDTO.getLabels(), nameDateLabelUserDTO.getUser());
    }
}
