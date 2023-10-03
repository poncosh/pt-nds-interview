package com.crudspringboot.restful.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddStudentsRequest {

  @NotBlank
  @Size(max = 255)
  private String nama;

  @NotBlank
  private String alamat;

  @JsonFormat(pattern = "yyyy-MM-dd")
  @Past
  private LocalDate tanggalLahir;

  @NotBlank
  @Size(max = 255)
  private String noHandphone;
}
