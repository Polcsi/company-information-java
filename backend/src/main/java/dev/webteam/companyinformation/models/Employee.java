package dev.webteam.companyinformation.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    private String id;
    private String name;
    private String email;
    private String jobTitle;
    private Integer age;

    public Employee(String name, String email, String jobTitle, Integer age) {
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.age = age;
    }
}
