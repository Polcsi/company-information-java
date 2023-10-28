package dev.webteam.companyinformation.controllers;

import dev.webteam.companyinformation.models.Employee;
import dev.webteam.companyinformation.services.EmployeeService;
import dev.webteam.companyinformation.utils.ResponseClass;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<ResponseClass<Employee>> createEmployee(@RequestBody Map<String, String> payload) {
            return new ResponseEntity<>(employeeService.createEmployee(payload.get("companyId"), payload.get("name"), payload.get("email"), payload.get("jobTitle"), Integer.parseInt(payload.get("age"))), HttpStatus.CREATED);
    }
}
