package com.crudspringboot.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.crudspringboot.restful.model.AddStudentsRequest;
import com.crudspringboot.restful.model.Response;
import com.crudspringboot.restful.service.StudentsService;

@RestController
public class StudentsController {
  @Autowired
  private StudentsService studentsService;

  @PostMapping(
    path = "/api/students",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE  
  )
  public Response<String> addStudents(@RequestBody AddStudentsRequest request) {
    studentsService.addStudents(request);
    return Response.<String>builder().data("Students " + request.getNama() + " has already been created").build();
  }
}
