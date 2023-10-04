package com.crudspringboot.restful.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.crudspringboot.restful.entity.Student;
import com.crudspringboot.restful.model.StudentsRequest;
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
  public void addStudents(StudentsRequest request) {
    Set<ConstraintViolation<StudentsRequest>> constraintViolations = validator.validate(request);
    if (constraintViolations.size() != 0) {
      throw new ConstraintViolationException(constraintViolations);
    }

    Student student = new Student();
    student.setNama(request.getNama());
    student.setAlamat(request.getAlamat());
    student.setTanggalLahir(request.getTanggalLahir());
    student.setNoHandphone(request.getNoHandphone());

    studentsRepository.save(student);
  }

  @Transactional
  public Student putStudents(long nim, StudentsRequest request) {
    Set<ConstraintViolation<StudentsRequest>> constraintViolations = validator.validate(request);
    if (constraintViolations.size() != 0) {
      throw new ConstraintViolationException(constraintViolations);
    }

    Student student = studentsRepository.findByNim(nim);
    student.setNama(request.getNama());
    student.setAlamat(request.getAlamat());
    student.setTanggalLahir(request.getTanggalLahir());
    student.setNoHandphone(request.getNoHandphone());

    studentsRepository.save(student);
    return student;
  }

  @Transactional
  public void deleteStudents(long nim) {
    studentsRepository.deleteByNim(nim);
  }

  public Page<Student> getStudents(int page) {
    Page<Student> students = studentsRepository.findAll(PageRequest.of(10 * (page -1), 6));
    return students;
  }

  public Student getStudentByNim(long nim) {
    Student student = studentsRepository.findByNim(nim);
    return student;
  }
}
