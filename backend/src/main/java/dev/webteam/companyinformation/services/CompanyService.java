package dev.webteam.companyinformation.services;

import dev.webteam.companyinformation.models.Company;
import dev.webteam.companyinformation.repositories.CompanyRepository;
import dev.webteam.companyinformation.repositories.EmployeeRepository;
import dev.webteam.companyinformation.repositories.FilteringFactory;
import dev.webteam.companyinformation.utils.PaginatedResponse;
import dev.webteam.companyinformation.utils.ResponseClass;
import dev.webteam.companyinformation.utils.Status;
import lombok.SneakyThrows;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final EmployeeRepository employeeRepository;

    public CompanyService(CompanyRepository companyRepository, EmployeeRepository employeeRepository) {
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
    }

    @SneakyThrows
    public PaginatedResponse<List<Company>> allCompanies(Optional<Integer> page,  Optional<Integer> size,  Optional<List<String>> filter) {
        try {
            Optional<Pageable> pageable = Optional.empty();

            if (page.isPresent() && size.isPresent()) {
                pageable = PageRequest.of(page.get(), size.get()).toOptional();
            }

            // Get all companies
            List<Company> companyList = companyRepository.findAll();

            // Return paginated response with filtering
            Page<Company> allWithFilter = companyRepository.findAllWithFilter(Company.class, FilteringFactory.parseFromParams(filter, Company.class), pageable);

            // Get page size
            int pageSize = allWithFilter.getSize();
            // Calculate total pages
            int totalPages = companyList.size() / pageSize;

            // Get current page
            int currentPage = allWithFilter.getNumber();
            // Calculate hasNext
            boolean hasNext = currentPage < totalPages;
            // Calculate hasPrevious
            boolean hasPrevious = currentPage > 0;

            return new PaginatedResponse<>("Companies fetched successfully", Status.SUCCESS, allWithFilter.getContent(), allWithFilter.getNumber(), (long) companyList.size() - 1, totalPages, allWithFilter.getSize(), hasNext, hasPrevious);
        } catch (NullPointerException ex) {
            throw new NullPointerException("Invalid filtering parameter");
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @SneakyThrows
    public ResponseClass<Company> createCompany(String name, String email, Optional<String> description) {
        try {
            Company company = new Company(name, email, description.orElse(null));
            companyRepository.save(company);

            return new ResponseClass<>("Company created successfully", Status.SUCCESS, company);
        } catch(DuplicateKeyException ex) {
            throw new DuplicateKeyException(ex.getMessage());
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
            // Delete all employees from company
            employeeRepository.deleteEmployeeByCompanyId(companyId);
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

    @SneakyThrows
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
