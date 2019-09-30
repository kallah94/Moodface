package com.mycompany.myapp.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

// for static metamodels
import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.domain.Mood_;
import com.mycompany.myapp.domain.User_;
import com.mycompany.myapp.domain.enumeration.Moods;
import com.mycompany.myapp.repository.MoodRepository;
import com.mycompany.myapp.repository.search.MoodSearchRepository;
import com.mycompany.myapp.security.AuthoritiesConstants;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.dto.MoodCriteria;
import com.mycompany.myapp.service.dto.MoodDTO;
import com.mycompany.myapp.service.mapper.MoodMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Mood} entities in the database.
 * The main input is a {@link MoodCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link MoodDTO} or a {@link Page} of {@link MoodDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class MoodQueryService extends QueryService<Mood> {

    private final Logger log = LoggerFactory.getLogger(MoodQueryService.class);

    private final MoodRepository moodRepository;

    private final MoodMapper moodMapper;

    public MoodQueryService(MoodRepository moodRepository, MoodMapper moodMapper,
            MoodSearchRepository moodSearchRepository) {
        this.moodRepository = moodRepository;
        this.moodMapper = moodMapper;
    }

    /**
     * Return a {@link List} of {@link MoodDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<MoodDTO> findByCriteria(MoodCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Mood> specification = createSpecification(criteria);
        return moodMapper.toDto(moodRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link MoodDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<MoodDTO> findByCriteria(MoodCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Mood> specification = createSpecification(criteria);
        return moodRepository.findAll(specification, page)
            .map(moodMapper::toDto);
    }

    /**
     *
     * @param pageable
     * @return
     */
    @Transactional(readOnly = true)
    public Page<MoodDTO> findByRole(Pageable pageable) {
        log.debug("find by the currentuser role");
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            return moodRepository.findAll(pageable)
                .map(moodMapper::toDto);
        } else {
            return moodRepository.findByUserIsCurrentUser(pageable)
                .map(moodMapper::toDto);
        }
    }
    /**
     *
     * @param plateauName
     * @param pageable
     */
    @Transactional(readOnly = true)
    public Page<MoodDTO> findByPlateau(Pageable pageable, String plateauName) {
        log.debug("find by a speciique plateau Name");
        return moodRepository.findByPlateauName(plateauName, pageable)
                .map(moodMapper::toDto);
    }
    /*
     * @param departementName
     * @param pageable
     */
    @Transactional(readOnly = true)
    public Page<MoodDTO> findByDepartement(Pageable pageable, String departementName) {
        log.debug("find by a specifique departement Name");
        return moodRepository.findByDepartementName(departementName, pageable)
                .map(moodMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<MoodDTO> findByService(Pageable pageable, String serviceName) {
        log.debug("find by a service Name");
        return  moodRepository.findByserviceName(serviceName, pageable)
                    .map(moodMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<MoodDTO> findBymood(Pageable pageable, Moods mood) {
        log.debug("find Moods by mood value");
        return moodRepository.findByMoodValue(mood, pageable)
                .map(moodMapper::toDto);
    }
    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(MoodCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Mood> specification = createSpecification(criteria);
        return moodRepository.count(specification);
    }

    /**
     * Function to convert {@link MoodCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Mood> createSpecification(MoodCriteria criteria) {
        Specification<Mood> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Mood_.id));
            }
            if (criteria.getMood() != null) {
                specification = specification.and(buildSpecification(criteria.getMood(), Mood_.mood));
            }
            if (criteria.getComment() != null) {
                specification = specification.and(buildStringSpecification(criteria.getComment(), Mood_.comment));
            }
            if (criteria.getDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDate(), Mood_.date));
            }
            if (criteria.getUserId() != null) {
                specification = specification.and(buildSpecification(criteria.getUserId(),
                    root -> root.join(Mood_.user, JoinType.LEFT).get(User_.id)));
            }
        }
        return specification;
    }
}
