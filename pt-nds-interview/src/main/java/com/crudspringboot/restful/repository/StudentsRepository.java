package com.crudspringboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crudspringboot.restful.entity.Student;

@Repository
public interface StudentsRepository extends JpaRepository<Student, String> {
  Student findByNim(long nim);

  void deleteByNim(long nim);
}
