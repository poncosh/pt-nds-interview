package com.crudspringboot.restful.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crudspringboot.restful.entity.Students;
import com.crudspringboot.restful.model.AddStudentsRequest;
import com.crudspringboot.restful.repository.StudentsRepository;

import jakarta.validation.Validator;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

import java.util.Set;

@Service
public class StudentsService {
  @Autowired
  private StudentsRepository studentsRepository;

  @Autowired
  private Validator validator;

  @Transactional
  public void addStudents(AddStudentsRequest request) {
    Set<ConstraintViolation<AddStudentsRequest>> constraintViolations = validator.validate(request);
    if (constraintViolations.size() != 0) {
      throw new ConstraintViolationException(constraintViolations);
    }

    Students student = new Students();
    student.setNama(request.getNama());
    student.setAlamat(request.getAlamat());
    student.setTanggalLahir(request.getTanggalLahir());
    student.setNoHandphone(request.getNoHandphone());

    studentsRepository.save(student);
  }
}