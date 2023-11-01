package dev.webteam.companyinformation.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
public class ErrorResponse<T> extends ResponseClass<T> {
    private HttpStatus httpStatus;
    @Setter
    private Integer errorCode;
    @Setter
    private Object errors;
    @Setter
    private String path;

    public ErrorResponse(String message, Status status, T data, HttpStatus httpStatus, Integer errorCode, String errors, String path) {
        super(message, status, data);
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.errors = errors;
        this.path = path;
    }

    public ErrorResponse(String message, Status status, T data, HttpStatus httpStatus) {
        super(message, status, data);
        this.httpStatus = httpStatus;
    }

    public ErrorResponse(String message, Status status, HttpStatus httpStatus) {
        super(message, status);
        this.httpStatus = httpStatus;
    }
    public ErrorResponse(String message, Status status, T data) {
        super(message, status, data);
    }

    public ErrorResponse(String message, Status status) {
        super(message, status);
    }

    public ErrorResponse() {
    }

}
