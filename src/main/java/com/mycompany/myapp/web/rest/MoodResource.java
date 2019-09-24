package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.repository.MoodRepository;
import com.mycompany.myapp.repository.search.MoodSearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Mood}.
 */
@RestController
@RequestMapping("/api")
public class MoodResource {

    private final Logger log = LoggerFactory.getLogger(MoodResource.class);

    private static final String ENTITY_NAME = "mood";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MoodRepository moodRepository;

    private final MoodSearchRepository moodSearchRepository;

    public MoodResource(MoodRepository moodRepository, MoodSearchRepository moodSearchRepository) {
        this.moodRepository = moodRepository;
        this.moodSearchRepository = moodSearchRepository;
    }

    /**
     * {@code POST  /moods} : Create a new mood.
     *
     * @param mood the mood to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mood, or with status {@code 400 (Bad Request)} if the mood has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/moods")
    public ResponseEntity<Mood> createMood(@Valid @RequestBody Mood mood) throws URISyntaxException {
        log.debug("REST request to save Mood : {}", mood);
        if (mood.getId() != null) {
            throw new BadRequestAlertException("A new mood cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mood result = moodRepository.save(mood);
        moodSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/moods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /moods} : Updates an existing mood.
     *
     * @param mood the mood to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mood,
     * or with status {@code 400 (Bad Request)} if the mood is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mood couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/moods")
    public ResponseEntity<Mood> updateMood(@Valid @RequestBody Mood mood) throws URISyntaxException {
        log.debug("REST request to update Mood : {}", mood);
        if (mood.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mood result = moodRepository.save(mood);
        moodSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mood.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /moods} : get all the moods.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of moods in body.
     */
    @GetMapping("/moods")
    public ResponseEntity<List<Mood>> getAllMoods(Pageable pageable) {
        log.debug("REST request to get a page of Moods");
        Page<Mood> page = moodRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /moods/:id} : get the "id" mood.
     *
     * @param id the id of the mood to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mood, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/moods/{id}")
    public ResponseEntity<Mood> getMood(@PathVariable Long id) {
        log.debug("REST request to get Mood : {}", id);
        Optional<Mood> mood = moodRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mood);
    }

    /**
     * {@code DELETE  /moods/:id} : delete the "id" mood.
     *
     * @param id the id of the mood to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/moods/{id}")
    public ResponseEntity<Void> deleteMood(@PathVariable Long id) {
        log.debug("REST request to delete Mood : {}", id);
        moodRepository.deleteById(id);
        moodSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/moods?query=:query} : search for the mood corresponding
     * to the query.
     *
     * @param query the query of the mood search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/moods")
    public ResponseEntity<List<Mood>> searchMoods(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Moods for query {}", query);
        Page<Mood> page = moodSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
