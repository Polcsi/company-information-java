package dev.webteam.companyinformation.repositories;

import dev.webteam.companyinformation.models.Employee;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, ObjectId> {
    void deleteEmployeeById(ObjectId id);
    void deleteEmployeeByCompanyId(String companyId);
}
