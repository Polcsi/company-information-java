package dev.webteam.companyinformation.controllers;

import dev.webteam.companyinformation.models.Employee;
import dev.webteam.companyinformation.services.EmployeeService;
import dev.webteam.companyinformation.utils.ResponseClass;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/employee")
public class EmployeeController {
    private final EmployeeService employeeService;
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    private void validateEmployee(Employee employee) {
        jakarta.validation.Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Employee>> violations = validator.validate(employee);
        if (!violations.isEmpty()) {
            System.out.println(("VALIDATION FAILED"));
            throw new ConstraintViolationException(violations);
        }
        System.out.println(("VALIDATION SUCCESSFUL"));
    }
    @PostMapping
    public ResponseEntity<ResponseClass<Employee>> createEmployee(@RequestBody Map<String, String> payload) {
        // Create an employee object
        Employee employee = new Employee(payload.get("name"), payload.get("email"), payload.get("jobTitle"), payload.get("age") == null ? null : Integer.parseInt(payload.get("age")));
        // Validate employee object
        validateEmployee(employee);

            return new ResponseEntity<>(employeeService.createEmployee(payload.get("companyId"), payload.get("name"), payload.get("email"), payload.get("jobTitle"), Integer.parseInt(payload.get("age"))), HttpStatus.CREATED);
    }
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<ResponseClass<Employee>> deleteEmployee(@PathVariable ObjectId employeeId) {
        return new ResponseEntity<>(employeeService.deleteEmployee(employeeId), HttpStatus.OK);
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<ResponseClass<Employee>> updateEmployee(@PathVariable ObjectId employeeId, @RequestBody Employee employee) {
        return new ResponseEntity<>(employeeService.updateEmployee(employeeId, employee.getName(), employee.getEmail(), employee.getJobTitle(), employee.getAge()), HttpStatus.OK);
    }
}
