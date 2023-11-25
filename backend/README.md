# Backend Documentation

Here you can find the documentation of the backend. You can find the documentation of the frontend [here](../frontend/README.md).
</br>
</br>
This is a `Java Spring Boot` application which provides a `REST API` for the frontend application. The app uses a `MongoDB` database to store the data about the companies and the employees.

---

## Table of contents

- [Installation](#installation)
- [Technologies](#technologies)
  - [Libraries](#libraries)
- [Endpoints](#endpoints)
  - [Company endpoints](#company-endpoints)
  - [Employee endpoints](#employee-endpoints)

---

### Installation

1. Start IntelliJ IDEA

2. Open the backend folder

3. Wait for the dependencies to be installed

4. Start the application

---

### Technologies

<table align="center">
<tr>
    <td>
        <p align="center">
            <img width="160" src="./docs/images/java.png" alt="java"/>
        </p>
    </td>
    <td>
        <p align="center">
           <img width="160" src="./docs/images/mongo.png" alt="mongodb"/>
        </p>
    </td>
    <td>
        <p align="center">
            <img width="160" src="./docs/images/spring_boot.png" alt="mongodb"/>
        </p>
    </td>
</tr>
    <tr>
        <td><p align="center">Java</p></td>
        <td><p align="center">MongoDB</p></td>
        <td><p align="center">Spring Boot</p></td>
    </tr>
</table>
</br>

This project uses the following technologies:

- Java 21
- Spring Boot
- Spring Validation
- Spring Web
- Maven
- MongoDB

#### Libraries

- [Lombok](https://projectlombok.org/)
- [Spring boot starter data mongodb](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-mongodb)
- [Spring boot starter validation](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-validation)
- [Spring boot starter web](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web)
- [Spring boot devtools](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-devtools)
- [Spring boot starter test](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test)
- [spring-dotenv](https://mvnrepository.com/artifact/me.paulschwarz/spring-dotenv)

---

### Endpoints

The application provides the following endpoints.

#### Company endpoints

<table>
  <tr>
    <th align="center">Method</th>
    <th>Endpoint</th>
    <th>Body</th>
    <th>Response</th>
    <th>Description</th>
  </tr>
  <tr>
    <td align="center">GET</td>
    <td>/api/v1/companies</td>
    <td align="center">-</td>
    <td>-</td>
    <td>Get all companies</td>
  </tr>
    <tr>
        <td align="center">GET</td>
        <td>/api/v1/company/{id}</td>
        <td align="center">-</td>
        <td>-</td>
        <td>Get a company by id</td>
    </tr>
    <tr>
        <td align="center">POST</td>
        <td>/api/v1/company</td>
        <td>
            <pre>
{
    "name": "Company name",
    "email": "Company email",
    "description": "...",
}
            </pre>
        </td>
        <td>
            <pre>
{
    "id": "Company id",
    "name": "Company name",
    "email": "Company email",
    "description": "...",
}
            </pre>
        </td>
        <td>Create a company</td>
    </tr>
    <tr>
        <td align="center">PUT</td>
        <td>/api/v1/company/{id}</td>
        <td>
            <pre>
{
    "name": "Company name",
    "email": "Company email",
    "description": "...",
}
            </pre>
        </td>
        <td>
            <pre>
{
    "name": "Company name",
    "email": "Company email",
    "description": "...",
}
            </pre>
        </td>
        <td>Update a company</td>
    </tr>
    <tr>
        <td align="center">DELETE</td>
        <td>/api/v1/company/{id}</td>
        <td align="center">-</td>
        <td>-</td>
        <td>Delete a company</td>
</table>

#### Employee endpoints

<table>
  <tr>
    <th align="center">Method</th>
    <th>Endpoint</th>
    <th>Body</th>
    <th>Response</th>
    <th>Description</th>
  </tr>
  <tr>
    <td align="center">GET</td>
    <td>/api/v1/employees</td>
    <td align="center">-</td>
    <td>-</td>
    <td>Get all employees</td>
  </tr>
    <tr>
        <td align="center">GET</td>
        <td>/api/v1/employee/{id}</td>
        <td align="center">-</td>
        <td>-</td>
        <td>Get an employee by id</td>
    </tr>
    <tr>
        <td align="center">POST</td>
        <td>/api/v1/employee</td>
        <td>
            <pre>
{
    "name": "Employee name",
    "email": "Employee email",
    "age": "Employee age",
    "jobTitle": "Employee job title",
    "companyId": "Company id",
}
            </pre>
        </td>
        <td>
            <pre>
{
    "id": "Employee id",
    "name": "Employee name",
    "email": "Employee email",
    "age": "Employee age",
    "jobTitle": "Employee job title",
    "companyId": "Company id",
}
            </pre>
        </td>
        <td>Create an employee</td>
    </tr>
    <tr>
        <td align="center">PUT</td>
        <td>/api/v1/employee/{id}</td>
        <td>
            <pre>
{
    "name": "Employee name",
    "email": "Employee email",
    "age": "Employee age",
    "jobTitle": "Employee job title",
}
            </pre>
        </td>
        <td>
            <pre>
{
    "firstName": "Employee first name",
    "lastName": "Employee last name",
    "email": "Employee email",
    "companyId": "Company id",
}
            </pre>
        </td>
        <td>Update an employee</td>
    </tr>
    <tr>
        <td align="center"><span color="white" background="red">DELETE</span></td>
        <td>/api/v1/employee/{id}</td>
        <td align="center">-</td>
        <td>-</td>
        <td>Delete an employee</td>
</table>
