package dev.webteam.companyinformation.services;

import dev.webteam.companyinformation.models.Company;
import dev.webteam.companyinformation.models.Employee;
import dev.webteam.companyinformation.repositories.EmployeeRepository;
import dev.webteam.companyinformation.utils.ResponseClass;
import dev.webteam.companyinformation.utils.Status;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final MongoTemplate mongoTemplate;

    public EmployeeService(EmployeeRepository employeeRepository, MongoTemplate mongoTemplate) {
        this.employeeRepository = employeeRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public ResponseClass<Employee> createEmployee(String companyId, String name, String email, String jobTitle, Integer age) {
        Employee employee = employeeRepository.insert(new Employee(name, email, jobTitle, age, companyId));

        mongoTemplate.update(Company.class)
                .matching(Criteria.where("companyId").is(companyId))
                .apply(new Update().push(("employeeIds"), employee)).first();

        return new ResponseClass<>("Employee created successfully", Status.SUCCESS, employee);
    }

    public ResponseClass<Employee> deleteEmployee(ObjectId employeeId) {
        employeeRepository.deleteEmployeeById(employeeId);

        return new ResponseClass<>("Employee deleted successfully", Status.SUCCESS);
    }

    public ResponseClass<Employee> updateEmployee(ObjectId employeeId, String name, String email, String jobTitle, Integer age) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);

        if (employee.isPresent()) {
            Employee employee1 = employee.get();
            employee1.setName(name);
            employee1.setEmail(email);
            employee1.setJobTitle(jobTitle);
            employee1.setAge(age);
            employeeRepository.save(employee1);
            return new ResponseClass<>("Employee updated successfully", Status.SUCCESS, employee1);
        } else {
            return new ResponseClass<>("Employee not found", Status.ERROR);
        }
    }
}
