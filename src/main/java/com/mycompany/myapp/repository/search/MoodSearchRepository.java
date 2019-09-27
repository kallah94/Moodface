package com.mycompany.myapp.repository.search;
import com.mycompany.myapp.domain.Mood;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Mood} entity.
 */
public interface MoodSearchRepository extends ElasticsearchRepository<Mood, Long> {
}
