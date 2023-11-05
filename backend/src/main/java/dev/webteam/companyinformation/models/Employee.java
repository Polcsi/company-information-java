package dev.webteam.companyinformation.models;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
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

    public Employee(String name, String email, String jobTitle, Integer age) {
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.age = age;
    }

    public static void validateEmployee(Employee employee) {
        jakarta.validation.Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Employee>> violations = validator.validate(employee);
        if (!violations.isEmpty()) {
            System.out.println(("EMPLOYEE VALIDATION FAILED"));
            throw new ConstraintViolationException(violations);
        }
        System.out.println(("EMPLOYEE VALIDATION SUCCESSFUL"));
    }
}
