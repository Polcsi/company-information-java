package dev.webteam.companyinformation.services;

import dev.webteam.companyinformation.models.Company;
import dev.webteam.companyinformation.repositories.CompanyRepository;
import dev.webteam.companyinformation.utils.ResponseClass;
import dev.webteam.companyinformation.utils.Status;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
    public ResponseClass<List<Company>> allCompanies() {
        return new ResponseClass<>("Companies fetched successfully", Status.SUCCESS, companyRepository.findAll());
    }

    public ResponseClass<Company> createCompany(String name, String email, Optional<String> description) {
        Company company = new Company(name, email, description.orElse(null));
        companyRepository.save(company);
        return new ResponseClass<>("Company created successfully", Status.SUCCESS, company);
    }

    public ResponseClass<Object> deleteCompany(String companyId) {
        companyRepository.deleteByCompanyId(companyId);
        return new ResponseClass<>("Company deleted successfully", Status.SUCCESS);
    }

    public ResponseClass<Company> singleCompany(String companyId) {
        Optional<Company> company = companyRepository.findCompanyByCompanyId(companyId);
        return company.map(value -> new ResponseClass<>("Company fetched successfully", Status.SUCCESS, value)).orElseGet(() -> new ResponseClass<>("Company not found", Status.ERROR));
    }

    public ResponseClass<Company> updateCompany(String companyId, String name, String email, Optional<String> description) {
        Optional<Company> company = companyRepository.findCompanyByCompanyId(companyId);

        if (company.isPresent()) {
            Company company1 = company.get();
            company1.setName(name);
            company1.setEmail(email);
            company1.setDescription(description.orElse(null));
            companyRepository.save(company1);
            return new ResponseClass<>("Company updated successfully", Status.SUCCESS, company1);
        } else {
            return new ResponseClass<>("Company not found", Status.ERROR);
        }
    }
}
