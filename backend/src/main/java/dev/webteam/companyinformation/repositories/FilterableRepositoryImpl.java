package dev.webteam.companyinformation.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class FilterableRepositoryImpl<T> implements FilterableRepository<T> {

    private final MongoTemplate mongoTemplate;

    public FilterableRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Page<T> findAllWithFilter(Class<T> typeParameterClass,Filtering filtering, Optional<Pageable> pageable) {
        // Apply only filtering if pageable is not present
        if (pageable.isEmpty()) {
            // APPLY SORTING HERE
            // Query query = constructQueryFromFiltering(filtering).with(Sort.by(Sort.Direction.ASC, "email"));
            Query query = constructQueryFromFiltering(filtering);
            List<T> ts = mongoTemplate.find(query, typeParameterClass);
            return PageableExecutionUtils.getPage(ts, pageable.orElse(Pageable.unpaged()), () -> mongoTemplate.count(query, typeParameterClass));
        } else  {
            Query query = constructQueryFromFiltering(filtering).with(pageable.get());
            List<T> ts = mongoTemplate.find(query, typeParameterClass);
            return PageableExecutionUtils.getPage(ts, pageable.get(), () -> mongoTemplate.count(query, typeParameterClass));
        }
    }

    @Override
    public List<Object> getAllPossibleValuesForFilter(Class<T> typeParameterClass, Filtering filtering, String filterKey) {
        Query query = constructQueryFromFiltering(filtering);
        return mongoTemplate.query(typeParameterClass).distinct(filterKey).matching(query).all();
    }
}
