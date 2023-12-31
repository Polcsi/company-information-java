package dev.webteam.companyinformation.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Document(collection = "companies")
@Data
@AllArgsConstructor
@NoArgsConstructor
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

    public Company(String name, String email, String description) {
        this.companyId = UUID.randomUUID().toString();
        this.name = name;
        this.email = email;
        this.description = description;
    }

    public Company(String name, String email) {
        this.companyId = UUID.randomUUID().toString();
        this.name = name;
        this.email = email;
    }

    public static void validateCompany(Company company) {
        jakarta.validation.Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Company>> violations = validator.validate(company);
        if (!violations.isEmpty()) {
            System.out.println(("COMPANY VALIDATION FAILED"));
            throw new ConstraintViolationException(violations);
        }
        System.out.println(("COMPANY VALIDATION SUCCESSFUL"));
    }
}
