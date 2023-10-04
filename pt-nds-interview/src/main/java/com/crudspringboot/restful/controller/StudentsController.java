package com.crudspringboot.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.crudspringboot.restful.entity.Student;
import com.crudspringboot.restful.model.StudentsRequest;
import com.crudspringboot.restful.model.PutStudentsResponse;
import com.crudspringboot.restful.model.Response;
import com.crudspringboot.restful.model.StudentsResponse;
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
  public ResponseEntity<Response<String>> addStudents(@RequestBody StudentsRequest request) {
    studentsService.addStudents(request);
    return new ResponseEntity<Response<String>>(Response.<String>builder().data("Students " + request.getNama() + " has already been created").build(), HttpStatus.CREATED);
  }

  @GetMapping(
    path = "/api/students",
    consumes = MediaType.ALL_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public StudentsResponse<Page<Student>> getStudents(@RequestParam("page") int page) {
    Page<Student> students = studentsService.getStudents(page);
    if (page == 0 || page < 0 || page > students.getTotalPages()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page is not available");
    }
    return new StudentsResponse<>(students.getTotalPages(), students);
  }

  @GetMapping(
    path = "/api/students/{nim}",
    consumes = MediaType.ALL_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public Response<Student> getStudentsByNim(@PathVariable long nim) {
    Student student = studentsService.getStudentByNim(nim);
    return Response.<Student>builder().data(student).build();
  }

  @PutMapping(
    value = "/api/students/{nim}",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public PutStudentsResponse<Student> putStudents(@PathVariable long nim, @RequestBody StudentsRequest request) {
    Student student = studentsService.putStudents(nim, request);
    return new PutStudentsResponse<>("Success editing " + request.getNama() + " students", student);
  }

  @DeleteMapping(
    value = "/api/students/{nim}",
    consumes = MediaType.ALL_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<String> deleteStudents(@PathVariable long nim) {
    studentsService.deleteStudents(nim);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
