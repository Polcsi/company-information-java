package dev.webteam.companyinformation.utils;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ResponseClass<T> {
    private String message;
    private Status status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd hh:mm:ss")
    private LocalDateTime timestamp;
   private T data;

    public ResponseClass(String message, Status status, T data) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }
    public ResponseClass(String message, Status status) {
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }

    public ResponseClass() {
    }
}
