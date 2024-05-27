package com.example.backend.controller;

import com.example.backend.DTOs.CreateRepoDTO;
import com.example.backend.DTOs.FileDTO;
import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import com.example.backend.service.RepoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class RepoControllerTest {

    @Mock
    private RepoService repoService;

    @InjectMocks
    private RepoController repoController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFileUploadHandler() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(repoService.fileUpload(any(HttpServletRequest.class))).thenReturn("Success");

        String response = repoController.fileUploadHandler(request);

        assertEquals("Success", response);
        verify(repoService, times(1)).fileUpload(request);
    }

    @Test
    void testGetRepoHandler() {
        GetRepoDTO getRepoDTO = new GetRepoDTO();
        Repo repo = new Repo();
        when(repoService.getRepo(any(GetRepoDTO.class))).thenReturn(repo);

        Repo response = repoController.getRepoHandler(getRepoDTO);

        assertEquals(repo, response);
        verify(repoService, times(1)).getRepo(getRepoDTO);
    }

    @Test
    void testGetFolderHandler() {
        GetRepoDTO getRepoDTO = new GetRepoDTO();
        Folder folder = new Folder();
        when(repoService.getFolder(any(GetRepoDTO.class))).thenReturn(folder);

        Folder response = repoController.getFolderHandler(getRepoDTO);

        assertEquals(folder, response);
        verify(repoService, times(1)).getFolder(getRepoDTO);
    }

    @Test
    void testGetFileHandler() {
        GetRepoDTO getRepoDTO = new GetRepoDTO();
        FileDTO fileDTO = new FileDTO();
        when(repoService.getFile(any(GetRepoDTO.class))).thenReturn(fileDTO);

        ResponseEntity<FileDTO> response = repoController.getFileHandler(getRepoDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(fileDTO, response.getBody());
        verify(repoService, times(1)).getFile(getRepoDTO);
    }

    @Test
    void testDownloadFileHandler() {
        GetRepoDTO getRepoDTO = new GetRepoDTO();
        HttpServletResponse response = mock(HttpServletResponse.class);

        repoController.downloadFileHandler(getRepoDTO, response);

        verify(repoService, times(1)).downloadFile(getRepoDTO, response);
    }

    @Test
    void testCreateRepoHandler() {
        CreateRepoDTO repoDTO = new CreateRepoDTO();
        when(repoService.createRepo(any(CreateRepoDTO.class))).thenReturn(true);

        Boolean response = repoController.createRepoHandler(repoDTO);

        assertEquals(true, response);
        verify(repoService, times(1)).createRepo(repoDTO);
    }

    @Test
    void testGetAllPublicRepoHandler() {
        List<Repo> repos = new ArrayList<>();
        when(repoService.getAllPublicRepos()).thenReturn(repos);

        List<Repo> response = repoController.getAllPublicRepoHandler();

        assertEquals(repos, response);
        verify(repoService, times(1)).getAllPublicRepos();
    }

    @Test
    void testGetAllRepoByUserHandler() {
        UserDTO userDTO = new UserDTO();
        List<Repo> repos = new ArrayList<>();
        when(repoService.getAllByUser(any(UserDTO.class))).thenReturn(repos);

        List<Repo> response = repoController.getAllRepoByUserHandler(userDTO);

        assertEquals(repos, response);
        verify(repoService, times(1)).getAllByUser(userDTO);
    }

    @Test
    void testChangeStarHandler() {
        GetRepoDTO getRepoDTO = new GetRepoDTO();
        when(repoService.changeStar(any(GetRepoDTO.class))).thenReturn(true);

        Boolean response = repoController.getAllRepoByUserHandler(getRepoDTO);

        assertEquals(true, response);
        verify(repoService, times(1)).changeStar(getRepoDTO);
    }
}
