package dev.webteam.companyinformation.controllers.errors;

import dev.webteam.companyinformation.utils.ErrorResponse;
import dev.webteam.companyinformation.utils.Status;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<String> errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        ErrorResponse<Object> response = new ErrorResponse<>("Validation error", Status.VALIDATION_ERROR, HttpStatus.BAD_REQUEST);
        response.setErrors(errors);
        response.setErrorCode(status.value());

        return buildResponseEntity(response);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Object> handleDuplicateKey(HttpServletRequest request, DuplicateKeyException ex){
        ErrorResponse<Object> response = new ErrorResponse<>("Resource already exists", Status.DUPLICATE_KEY, HttpStatus.CONFLICT);
        response.setPath(request.getRequestURI());
        response.setErrors(ex.toString());
        response.setErrorCode(HttpStatus.CONFLICT.value());

        // define field and value
        String field = "", value = "";

        // Get error object from exception { field: value }
        Pattern p = Pattern.compile("(\\{\\s.*\\s\\})");
        Matcher m = p.matcher(ex.toString());

        if (m.find()) {
            // get field
            Pattern fieldPattern = Pattern.compile("(\\w+):");
            Matcher fieldMatcher = fieldPattern.matcher(m.group(1));

            if (fieldMatcher.find()) {
                field = fieldMatcher.group(1);
            }
            // Get value
            Pattern valuePattern = Pattern.compile(":(\\s.*\\s)");
            Matcher valueMatcher = valuePattern.matcher(m.group(1));

            if (valueMatcher.find()) {
                value = valueMatcher.group(1).replace("}", "").replace("\"", "").trim();
            }
        } else {
            System.out.println("No match");
        }

        // Check if field and value are not empty
        if(!field.isEmpty() || !value.isEmpty()) {
            // Create an object of the field that is duplicated
            Map<String, String> fieldError = new HashMap<>();
            fieldError.put(field, String.format("'%s' already exists", value));

            // Set field error
            response.setErrors(fieldError);
        }

        return buildResponseEntity(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleNotFound(Exception ex, HttpServletRequest request) {
        System.out.println(ex.getMessage());
        System.out.println(ex.getMessage().isEmpty());
        System.out.println(ex.getMessage().isBlank());
        ErrorResponse<Object> response = new ErrorResponse<>(ex.getMessage().isEmpty() || ex.getMessage().isBlank() ? "Something went wrong": ex.getMessage(), Status.ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        response.setPath(request.getRequestURI());
        response.setErrors(ex.toString());
        response.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());

        return buildResponseEntity(response);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Object> handleNoSuchElement(HttpServletRequest request, NoSuchElementException ex){
        ErrorResponse<Object> response = new ErrorResponse<>(ex.getMessage().isEmpty() || ex.getMessage().isBlank() ? "Resource not found": ex.getMessage(), Status.ERROR, HttpStatus.NOT_FOUND);
        response.setPath(request.getRequestURI());
        response.setErrors(ex.toString());
        response.setErrorCode(HttpStatus.NOT_FOUND.value());

        return buildResponseEntity(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolation(HttpServletRequest request, ConstraintViolationException ex){
        ErrorResponse<Object> response = new ErrorResponse<>("Validation Error", Status.VALIDATION_ERROR, HttpStatus.BAD_REQUEST);
        response.setPath(request.getRequestURI());
        response.setErrors(ex.toString());
        response.setErrorCode(HttpStatus.BAD_REQUEST.value());

        // Get all errors
        List<String> errors = new ArrayList<>();
        for (var violation : ex.getConstraintViolations()) {
            errors.add(violation.getMessage());
        }
        response.setErrors(errors);

        return buildResponseEntity(response);
    }

    private ResponseEntity<Object> buildResponseEntity(ErrorResponse<Object> errorResponse) {
        return new ResponseEntity<>(errorResponse, errorResponse.getHttpStatus());
    }
}
