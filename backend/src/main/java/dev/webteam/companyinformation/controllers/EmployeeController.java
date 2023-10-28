package dev.webteam.companyinformation.controllers;

import dev.webteam.companyinformation.models.Employee;
import dev.webteam.companyinformation.services.EmployeeService;
import dev.webteam.companyinformation.utils.ResponseClass;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<ResponseClass<Employee>> deleteEmployee(@PathVariable ObjectId employeeId) {
        return new ResponseEntity<>(employeeService.deleteEmployee(employeeId), HttpStatus.OK);
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<ResponseClass<Employee>> updateEmployee(@PathVariable ObjectId employeeId, @RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(employeeService.updateEmployee(employeeId, payload.get("name"), payload.get("email"), payload.get("jobTitle"), Integer.parseInt(payload.get("age"))), HttpStatus.OK);
    }
}
