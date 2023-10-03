package com.crudspringboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crudspringboot.restful.entity.Students;

@Repository
public interface StudentsRepository extends JpaRepository<Students, String> {
  
}
