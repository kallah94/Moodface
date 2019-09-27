package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.repository.MoodRepository;
import com.mycompany.myapp.repository.search.MoodSearchRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.dto.MoodDTO;
import com.mycompany.myapp.service.mapper.MoodMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Mood}.
 */
@Service
@Transactional
public class MoodService {

    private final Logger log = LoggerFactory.getLogger(MoodService.class);

    private final MoodRepository moodRepository;

    private final MoodMapper moodMapper;

    private final MoodSearchRepository moodSearchRepository;

    public MoodService(MoodRepository moodRepository, MoodMapper moodMapper, MoodSearchRepository moodSearchRepository) {
        this.moodRepository = moodRepository;
        this.moodMapper = moodMapper;
        this.moodSearchRepository = moodSearchRepository;
    }

    /**
     * Save a mood.
     *
     * @param moodDTO the entity to save.
     * @return the persisted entity.
     */
    public MoodDTO save(MoodDTO moodDTO) {
        log.debug("Request to save Mood : {}", moodDTO);
        Mood mood = moodMapper.toEntity(moodDTO);
        mood = moodRepository.save(mood);
        MoodDTO result = moodMapper.toDto(mood);
        moodSearchRepository.save(mood);
        return result;
    }

    /**
     * Get all the moods.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<MoodDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Moods");
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
        return moodRepository.findAll(pageable)
            .map(moodMapper::toDto);
        } else {
            return moodRepository.findByUserIsCurrentUser(pageable)
                .map(moodMapper::toDto);
        }
    }


    /**
     * Get one mood by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MoodDTO> findOne(Long id) {
        log.debug("Request to get Mood : {}", id);
        return moodRepository.findById(id)
            .map(moodMapper::toDto);
    }

    /**
     * Delete the mood by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Mood : {}", id);
        moodRepository.deleteById(id);
        moodSearchRepository.deleteById(id);
    }

    /**
     * Search for the mood corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<MoodDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Moods for query {}", query);
        return moodSearchRepository.search(queryStringQuery(query), pageable)
            .map(moodMapper::toDto);
    }
}
