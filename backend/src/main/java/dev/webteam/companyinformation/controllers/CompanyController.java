package dev.webteam.companyinformation.controllers;

import dev.webteam.companyinformation.models.Company;
import dev.webteam.companyinformation.services.CompanyService;
import dev.webteam.companyinformation.utils.ResponseClass;
import org.bson.types.ObjectId;
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
    public ResponseEntity<ResponseClass<Company>> createCompany(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<ResponseClass<Company>>(companyService.createCompany(payload.get("name"), payload.get("email"), Optional.ofNullable(payload.get("description"))), HttpStatus.CREATED);
    }

    @DeleteMapping("/{companyId}")
    public ResponseEntity<Object> deleteCompany(@PathVariable String companyId) {
        return new ResponseEntity<Object>(companyService.deleteCompany(companyId), HttpStatus.OK);
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<ResponseClass<Company>> getSingleCompany(@PathVariable String companyId) {
        return new ResponseEntity<>(companyService.singleCompany(companyId), HttpStatus.OK);
    }
}
