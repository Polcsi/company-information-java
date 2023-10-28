package dev.webteam.companyinformation.repositories;

import dev.webteam.companyinformation.models.Company;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends MongoRepository<Company, ObjectId> {
    // Delete company by companyId
    void deleteByCompanyId(String companyId);

    // Find company by companyId
    Optional<Company> findCompanyByCompanyId(String companyId);
}
