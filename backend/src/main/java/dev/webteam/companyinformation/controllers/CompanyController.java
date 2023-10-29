package dev.webteam.companyinformation.controllers;

import dev.webteam.companyinformation.models.Company;
import dev.webteam.companyinformation.services.CompanyService;
import dev.webteam.companyinformation.utils.ResponseClass;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {
    private final CompanyService companyService;
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<ResponseClass<List<Company>>> getAllCompanies() {
        return new ResponseEntity<>(companyService.allCompanies(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseClass<Company>> createCompany(@Valid @RequestBody Company company) {

        System.out.println(ResponseEntity.ok(company));
        return new ResponseEntity<>(companyService.createCompany(company.getName(), company.getEmail(), Optional.ofNullable(company.getDescription())), HttpStatus.CREATED);
    }

    @DeleteMapping("/{companyId}")
    public ResponseEntity<Object> deleteCompany(@PathVariable String companyId) {
        return new ResponseEntity<>(companyService.deleteCompany(companyId), HttpStatus.OK);
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<ResponseClass<Company>> getSingleCompany(@PathVariable String companyId) throws Exception {
        return new ResponseEntity<>(companyService.singleCompany(companyId), HttpStatus.OK);
    }

    @PutMapping("/{companyId}")
    public ResponseEntity<ResponseClass<Company>> updateCompany(@PathVariable String companyId, @RequestBody Map<String, String> payload) {
        return new ResponseEntity<>(companyService.updateCompany(companyId, payload.get("name"), payload.get("email"), Optional.ofNullable(payload.get("description"))), HttpStatus.OK);
    }
}
