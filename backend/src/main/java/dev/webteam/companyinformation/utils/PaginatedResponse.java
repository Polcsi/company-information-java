package dev.webteam.companyinformation.utils;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaginatedResponse<T> extends ResponseClass<T> {
    private Integer currentPage;
    private Long totalItems;
    private Integer totalPages;
    private Integer pageSize;
    private Boolean hasNext;
    private Boolean hasPrevious;

    public PaginatedResponse(String message, Status status, T data, Integer currentPage, Long totalItems, Integer totalPages, Integer pageSize, Boolean hasNext, Boolean hasPrevious) {
        super(message, status, data);
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.pageSize = pageSize;
        this.hasNext = hasNext;
        this.hasPrevious = hasPrevious;
    }
}
