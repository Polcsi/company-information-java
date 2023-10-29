package dev.webteam.companyinformation.controllers.errors;

import dev.webteam.companyinformation.utils.ErrorResponse;
import dev.webteam.companyinformation.utils.Status;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice()
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleNotFound(Exception ex, HttpServletRequest request) {
        System.out.println(ex.getMessage());
        System.out.println(ex.getMessage().isEmpty());
        System.out.println(ex.getMessage().isBlank());
        ErrorResponse<Object> response = new ErrorResponse<>(ex.getMessage().isEmpty() || ex.getMessage().isBlank() ? "Something went wrong": ex.getMessage(), Status.ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        response.setPath(request.getRequestURI());
        response.setError(ex.toString());
        response.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());

        return buildResponseEntity(response);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Object> handleNoSuchElement(HttpServletRequest request, NoSuchElementException ex){
        ErrorResponse<Object> response = new ErrorResponse<>(ex.getMessage().isEmpty() || ex.getMessage().isBlank() ? "Resource not found": ex.getMessage(), Status.ERROR, HttpStatus.NOT_FOUND);
        response.setPath(request.getRequestURI());
        response.setError(ex.toString());
        response.setErrorCode(HttpStatus.NOT_FOUND.value());

        return buildResponseEntity(response);
    }

    private ResponseEntity<Object> buildResponseEntity(ErrorResponse<Object> errorResponse) {
        return new ResponseEntity<>(errorResponse, errorResponse.getHttpStatus());
    }
}
