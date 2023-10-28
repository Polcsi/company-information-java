package dev.webteam.companyinformation.services;

import dev.webteam.companyinformation.models.Company;
import dev.webteam.companyinformation.models.Employee;
import dev.webteam.companyinformation.repositories.EmployeeRepository;
import dev.webteam.companyinformation.utils.ResponseClass;
import dev.webteam.companyinformation.utils.Status;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final MongoTemplate mongoTemplate;

    public EmployeeService(EmployeeRepository employeeRepository, MongoTemplate mongoTemplate) {
        this.employeeRepository = employeeRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public ResponseClass<Employee> createEmployee(String companyId, String name, String email, String jobTitle, Integer age) {
        Employee employee = employeeRepository.insert(new Employee(name, email, jobTitle, age));

        mongoTemplate.update(Company.class)
                .matching(Criteria.where("companyId").is(companyId))
                .apply(new Update().push(("employeeIds"), employee)).first();

        return new ResponseClass<>("Employee created successfully", Status.SUCCESS, employee);
    }
}
