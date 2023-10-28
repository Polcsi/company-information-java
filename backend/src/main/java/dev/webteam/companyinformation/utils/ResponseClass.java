package dev.webteam.companyinformation.utils;

import lombok.Getter;

@Getter
public class ResponseClass<T> {
    private String message;
    private Status status;
    private T data;

    public ResponseClass(String message, Status status, T data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
    public ResponseClass(String message, Status status) {
        this.message = message;
        this.status = status;
    }

    public ResponseClass() {
    }
}
