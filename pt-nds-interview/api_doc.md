# API Gateway Students With SpringBoot Framework

## POST '/api/students'

### Description
- Input new data to students table

### Request
- Body
```json
{
  "nama": String,
  "alamat": String,
  "tanggalLahir": String,
  "noHandphone": String
}
```

### Response
**_201 - Created_**
```json
{
  "data": String,
  "errors": null
}
```
_Example_
```json
{
  "data": "Students Trinusa has already been created",
  "errors": null
}
```
**_400 - Bad Request_**
```json
{
  "data": null,
  "errors": String
}
```
**_500 - Internal server error_**
```json
{
  "timestamp": Timestamp,
  "status": 500,
  "error": "Internal Server Error",
  "path": "/api/students"
}
```

## GET '/api/students/'

### Description
- Get all data from students table

### Request
- Params
```json
{
  "page": Number
}
```
Note: **Params page is mandatory**

### Response
**_200 - OK_**
```json
{
  "totalPages": Number,
  "data": {
    "content": [
      {
        "nim": Number,
        "nama": String,
        "alamat": String,
        "tanggalLahir": String,
        "noHandphone": String
      },
      ...
    ],
    ...
  }
}
```
_Example_
```json
{
  "totalPages": 1,
  "data": {
    "content": [
      {
        "nim": 11,
        "nama": "Lionel Messi",
        "alamat": "Buenos Aires",
        "tanggalLahir": "1990-12-20",
        "noHandphone": "0123456789"
      },
      ...
    ],
    ...
  }
}
```
**_400 - Bad Request_**
```json
{
  "data": null,
  "errors": "Page is not available"
}
```
**_500 - Internal server error_**
```json
{
  "timestamp": Timestamp,
  "status": 500,
  "error": "Internal Server Error",
  "path": "/api/students"
}
```

## GET '/api/students/{nimOfStudent}'

### Description
- Get data student by NIM

### Response
**_200 - OK_**
```json
{
  "message": "OK",
  "data": {
    "nim": Number,
    "nama": String,
    "alamat": String,
    "tanggalLahir": String,
    "noHandphone": String
  }
}
```
_Example_
```json
{
  "message": "OK",
  "data": {
    "nim": 11,
    "nama": "Lionel Messi",
    "alamat": "Buenos Aires",
    "tanggalLahir": "1990-12-20",
    "noHandphone": "0123456789"
  }
}
```
**_400 - Bad Request_**
```json
{
  "data": null,
  "errors": "User with ID negative is not available"
}
```
**_500 - Internal server error_**
```json
{
  "timestamp": Timestamp,
  "status": 500,
  "error": "Internal Server Error",
  "path": "/api/students/{nimOfStudent}"
}
```

## PUT '/api/students/{nimOfStudent}'

### Description
- Edit data of student by NIM

### Request
- Body
```json
{
  "nama": String,
  "alamat": String,
  "tanggalLahir": String,
  "noHandphone": String
}
```

### Response
**_200 - OK_**
```json
{
  "message": String,
  "data": {
    "nim": Number,
    "nama": String,
    "alamat": String,
    "tanggalLahir": String,
    "noHandphone": String
  }
}
```
_Example_
```json
{
  "message": "Success editing Diego Maradona students",
  "data": {
    "nim": 11,
    "nama": "Diego Maradona",
    "alamat": "Buenos Aires",
    "tanggalLahir": "1990-12-20",
    "noHandphone": "0123456789"
  }
}
```
**_500 - Internal server error_**
```json
{
  "timestamp": Timestamp,
  "status": 500,
  "error": "Internal Server Error",
  "path": "/api/students/{nimOfStudent}"
}
```

## DELETE '/api/students/{nimOfStudent}'

### Description
- Delete data of student by NIM

### Response
**_204 - No Content_**

**_500 - Internal server error_**
```json
{
  "timestamp": Timestamp,
  "status": 500,
  "error": "Internal Server Error",
  "path": "/api/students/{nimOfStudent}"
}
```