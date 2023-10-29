package dev.webteam.companyinformation.services;

import dev.webteam.companyinformation.models.Company;
import dev.webteam.companyinformation.repositories.CompanyRepository;
import dev.webteam.companyinformation.utils.ResponseClass;
import dev.webteam.companyinformation.utils.Status;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
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

    @SneakyThrows
    public ResponseClass<Company> createCompany(String name, String email, Optional<String> description) {
        try {
            Company company = new Company(name, email, description.orElse(null));
            companyRepository.save(company);

            return new ResponseClass<>("Company created successfully", Status.SUCCESS, company);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @SneakyThrows
    public ResponseClass<Object> deleteCompany(String companyId) {
        try {
            // Search for company
            Optional<Company> company = companyRepository.findCompanyByCompanyId(companyId);
            // Check if company exists
            if (company.isEmpty()) {
                throw new NoSuchElementException("Company not found");
            }
            // Delete company
            companyRepository.deleteByCompanyId(companyId);

            // Return success response
            return new ResponseClass<>("Company deleted successfully", Status.SUCCESS);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException(e.getMessage());
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @SneakyThrows
    public ResponseClass<Company> singleCompany(String companyId) {
        Optional<Company> company = companyRepository.findCompanyByCompanyId(companyId);

        return company.map(value -> new ResponseClass<>("Company fetched successfully", Status.SUCCESS, value)).orElseThrow(() -> new NoSuchElementException("Company not found"));
    }

    public ResponseClass<Company> updateCompany(String companyId, String name, String email, Optional<String> description) {
        Optional<Company> company = companyRepository.findCompanyByCompanyId(companyId);

        if (company.isPresent()) {
            Company company1 = company.get();
            company1.setName(name);
            company1.setEmail(email);
            company1.setDescription(description.orElse(null));
            companyRepository.save(company1);

            // Return success response
            return new ResponseClass<>("Company updated successfully", Status.SUCCESS, company1);
        } else {
            throw new NoSuchElementException("Company not found");
        }
    }
}
