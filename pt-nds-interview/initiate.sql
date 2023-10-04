create database `testnds_satrio_ponco_sushadi`;

use `testnds_satrio_ponco_sushadi`;

create table students (
	nim INT auto_increment primary key not null,
	nama VARCHAR(255) not null,
	alamat TINYTEXT not null,
	tanggal_lahir DATE not null,
	no_handphone VARCHAR(255) not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
) engine InnoDB;