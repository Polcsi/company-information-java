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
- [Models](#models)
  - [Company model](#company-model)
  - [Employee model](#employee-model)
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

### Models

The application uses two models. The `Company` and the `Employee` model. The `Company` model has a list of `Employee` ids. The `Employee` model has a `companyId` field which is the id of the company.
</br>
</br>
The application uses `MongoDB` as a database. The `Company` model has an `id` field which is the `ObjectId` of the document. The `Employee` model has an `id` field which is the `String` id of the document.

#### Company model

```java
public class Company {
    @Id
    private ObjectId id;
    @JsonProperty("companyId")
    @Indexed(unique = true)
    @Getter
    private String companyId;
    @NotBlank(message = "Name is required")
    @Indexed(unique = true)
    private String name;
    @NotBlank(message = "Email is required")
    @Email
    @Indexed(unique = true)
    private String email;
    private String description;
    @DocumentReference
    private List<Employee> employeeIds;
}
```

#### Employee model

```java
public class Employee {
    @Id
    private String id;
    @NotBlank(message = "Name is required")
    private String name;
    @Email
    @NotBlank(message = "Email is required")
    @Indexed(unique = true)
    private String email;
    @NotBlank(message = "Job is required")
    private String jobTitle;
    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be greater than 18")
    private Integer age;
    private String companyId;
}
```

---

### Endpoints

The application provides the following endpoints.

#### Response format

```json
{
	"message": "Companies fetched successfully",
	"status": "SUCCESS",
	"timestamp": "2023/11/25 10:13:22",
	"data": [
		{
            ...
        },
        ...
	],
	"currentPage": 0,
	"totalItems": 2,
	"totalPages": 3,
	"pageSize": 1,
	"hasNext": true,
	"hasPrevious": false
}
```

You can find several properties in the response.

- `message`: A message about the result of the request
- `status`: The status of the request. It can be `SUCCESS` or `ERROR`
- `timestamp`: The timestamp of the request
- `data`: The data of the request

Relevent properties for pagination:

- `currentPage`: The current page of the request
- `totalItems`: The total number of items
- `totalPages`: The total number of pages
- `pageSize`: The size of the page
- `hasNext`: If there is a next page
- `hasPrevious`: If there is a previous page

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
    <td><pre>
[
    {
    "id": "Company id",
    "name": "Company name",
    "email": "Company email",
    "description": "...",
    "employeeIds": [
        {
            "id": "Employee id",
            "name": "Employee name",
            "email": "Employee email",
            "age": "Employee age",
            "jobTitle": "Employee job title",
            "companyId": "Company id",
        },
        ...
    ]
},
...
]
    </pre></td>
    <td>Get all companies</td>
  </tr>
    <tr>
        <td align="center">GET</td>
        <td>/api/v1/company/{id}</td>
        <td align="center">-</td>
        <td><pre>
[
    {
    "id": "Company id",
    "name": "Company name",
    "email": "Company email",
    "description": "...",
    "employeeIds": [
        {
            "id": "Employee id",
            "name": "Employee name",
            "email": "Employee email",
            "age": "Employee age",
            "jobTitle": "Employee job title",
            "companyId": "Company id",
        },
        ...
    ]
}
]
        </pre></td>
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
        <td align="center">DELETE</td>
        <td>/api/v1/employee/{id}</td>
        <td align="center">-</td>
        <td>-</td>
        <td>Delete an employee</td>
</table>

### Filtering & Sorting

You can filter the companies by name, email, description and employees. You can find the query parameters below.

#### Sorting

You can sort the companies by name, email, description and employees. You can find the query parameters below.

```sh
http://127.0.0.1:8080/api/v1/company?filter=name%7Csort%7Cdesc
```

Above example will sort the companies by name in `descending` order.

```sh
http://127.0.0.1:8080/api/v1/company?filter=name%7Csort%7Casc
```

Above example will sort the companies by name in `ascending` order.

#### Filtering

You can filter the companies by name, email, description and employees. You can find the query parameters below.

##### Functions

- `eq`: Equals
- `gt`: Greater than
- `gte`: Greater than or equal
- `in`: In
- `lt`: Less than
- `lte`: Less than or equal
- `ne`: Not equal
- `nin`: Not in
- `regex`: Regular expression

```sh
http://127.0.0.1:8080/api/v1/company?filter=name%7Ceq%7Crandom%20test
```

Above example will filter the companies by name. It will return the companies which name is `random test`.

```sh
http://127.0.0.1:8080/api/v1/company?filter=companyId%7Ceq%7C4efcbbf9-97df-40de-ad60-181c6c3b2aa1
```

Above example will filter the companies by employee. It will return the companies which has an employee with the given id.

```sh
http://127.0.0.1:8080/api/v1/company?filter=name%7Cregex%7Crandom
```

Above example will filter the companies by name. It will return the companies which name contains the given string.
