package com.crudspringboot.restful.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.Month;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.crudspringboot.restful.model.AddStudentsRequest;
import com.crudspringboot.restful.model.Response;
import com.crudspringboot.restful.repository.StudentsRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;


@SpringBootTest
@AutoConfigureMockMvc
public class StudentsControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private StudentsRepository studentsRepository;

  @Autowired
  private ObjectMapper objectMapper;

  @BeforeEach
  void setUp() {
    studentsRepository.deleteAll();
  }

  @AfterEach
  void setOut() {
    studentsRepository.deleteAll();
  }

  @Test
  void testAddStudentSuccess() throws Exception {
    AddStudentsRequest request = new AddStudentsRequest();
    request.setNama("Joko Widodo");
    request.setAlamat("Jl. Jl. Dulu");
    request.setNoHandphone("08999329555");
    request.setTanggalLahir(LocalDate.of(1994, Month.DECEMBER, 05));

    mockMvc.perform(
      post("/api/students")
        .accept(MediaType.APPLICATION_JSON)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request))
    ).andExpectAll(
      status().isOk()
    ).andDo(result -> {
      Response<String> response = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
      });

      assertEquals("Students " + request.getNama() + " has already been created", response.getData());
    });
  }
}
