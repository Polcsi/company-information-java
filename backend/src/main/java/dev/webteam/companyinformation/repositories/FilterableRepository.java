package dev.webteam.companyinformation.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.*;

public interface FilterableRepository<T> {
    Page<T> findAllWithFilter(Class<T> typeParameterClass,
                              Filtering filtering, Optional<Pageable> pageable);

    List<Object> getAllPossibleValuesForFilter(Class<T> typeParameterClass, Filtering filtering, String filterKey);

    default Query constructQueryFromFiltering(Filtering filtering) {
        Query query = new Query();
        Map<String, Criteria> criteriaMap = new HashMap<>();
        for (Filtering.Filter filter : filtering.getFilterList()) {
            switch (filter.operator) {
                case eq:
                    criteriaMap.put(filter.key, Criteria.where(filter.key).is(filter.value));
                    break;
                case gt:
                    if (criteriaMap.containsKey(filter.key)) {
                        criteriaMap.get(filter.key).gt(filter.value);
                    } else {
                        criteriaMap.put(filter.key, Criteria.where(filter.key).gt(filter.value));
                    }
                    break;
                case gte:
                    if (criteriaMap.containsKey(filter.key)) {
                        criteriaMap.get(filter.key).gte(filter.value);
                    } else {
                        criteriaMap.put(filter.key, Criteria.where(filter.key).gte(filter.value));
                    }
                    break;
                case in:
                    criteriaMap.put(filter.key, Criteria.where(filter.key).in((HashSet<Object>)filter.value));
                    break;
                case lt:
                    if (criteriaMap.containsKey(filter.key)) {
                        criteriaMap.get(filter.key).lt(filter.value);
                    } else {
                        criteriaMap.put(filter.key, Criteria.where(filter.key).lt(filter.value));
                    }
                    break;
                case lte:
                    if (criteriaMap.containsKey(filter.key)) {
                        criteriaMap.get(filter.key).lte(filter.value);
                    } else {
                        criteriaMap.put(filter.key, Criteria.where(filter.key).lte(filter.value));
                    }
                    break;
                case ne:
                    criteriaMap.put(filter.key, Criteria.where(filter.key).ne(filter.value));
                    break;
                case nin:
                    criteriaMap.put(filter.key, Criteria.where(filter.key).nin((HashSet<Object>)filter.value));
                    break;
                case regex:
                    criteriaMap.put(filter.key, Criteria.where(filter.key).regex((String)filter.value));
                    break;
                default:
                    throw new IllegalArgumentException("Unknown operator: " + filter.operator);
            }
        }
        criteriaMap.values().forEach(query::addCriteria);
        return query;
    }
}