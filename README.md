# Simple App With Maven Spring Boot API & NextJS Frontend

**Description**

1. Aplikasi ini dibuat sebagai syarat bergabung dengan PT Nusantara Duta Solusindo
2. Aplikasi ini bertujuan untuk melakukan update terhadap database MySQL
3. _*Backend*_:
   - Spring MVC dengan Maven Wrapper
   - JPA sebagai fasilitator API dengan bantuan Hibernate dan Mapper
   - Lombok sebagai sarana pemrosesan agar lebih efisien
4. _*Frontend*_:
   - NextJS dengan Typescript
   - Redux Toolkit sebagai global state management
   - Axios sebagai jembatan API

## Installation

**_Backend_**

1. Install Maven sesuai dengan petunjuk pada https://maven.apache.org/install.html
2. Apabila tidak menggunakan Maven, gunakan IDE Jetbrains Intellij atau Install Springboot Snippet pada VSCode untuk menjalankan langsung pada source dokumen
3. Cek API Docs pada [API Docs](pt-nds-interview/api_doc.md)
4. Jalankan aplikasi dengan perintah

```
cd pt-nds-interview
mvn spring-boot:run
```

**_Frontend_**

1. Install NodeJS https://nodejs.org/en/download
2. Lakukan instalasi package

```
cd pt-nds-interview
npm install
```

3. Jalankan aplikasi dengan perintah

```
npm run dev
```
