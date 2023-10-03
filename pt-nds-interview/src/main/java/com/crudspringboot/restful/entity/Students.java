package com.crudspringboot.restful.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "students")
public class Students {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long nim;
  
  private String nama;

  private String alamat;

  @Column(name = "tanggal_lahir")
  private LocalDate tanggalLahir;
  
  @Column(name = "no_handphone")
  private String noHandphone;
}
