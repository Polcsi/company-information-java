package dev.webteam.companyinformation.controllers.errors;

import dev.webteam.companyinformation.utils.ErrorResponse;
import dev.webteam.companyinformation.utils.Status;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
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
