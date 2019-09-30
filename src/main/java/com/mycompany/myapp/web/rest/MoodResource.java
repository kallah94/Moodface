package com.mycompany.myapp.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.mycompany.myapp.domain.enumeration.Moods;
import com.mycompany.myapp.service.MoodQueryService;
import com.mycompany.myapp.service.MoodService;
import com.mycompany.myapp.service.dto.MoodCriteria;
import com.mycompany.myapp.service.dto.MoodDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

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

    private final MoodService moodService;

    private final MoodQueryService moodQueryService;

    public MoodResource(MoodService moodService, MoodQueryService moodQueryService) {
        this.moodService = moodService;
        this.moodQueryService = moodQueryService;
    }

    /**
     * {@code POST  /moods} : Create a new mood.
     *
     * @param moodDTO the moodDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new moodDTO, or with status {@code 400 (Bad Request)} if the mood has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/moods")
    public ResponseEntity<MoodDTO> createMood(@Valid @RequestBody MoodDTO moodDTO) throws URISyntaxException {
        log.debug("REST request to save Mood : {}", moodDTO);
        if (moodDTO.getId() != null) {
            throw new BadRequestAlertException("A new mood cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MoodDTO result = moodService.save(moodDTO);
        return ResponseEntity.created(new URI("/api/moods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /moods} : Updates an existing mood.
     *
     * @param moodDTO the moodDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated moodDTO,
     * or with status {@code 400 (Bad Request)} if the moodDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the moodDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/moods")
    public ResponseEntity<MoodDTO> updateMood(@Valid @RequestBody MoodDTO moodDTO) throws URISyntaxException {
        log.debug("REST request to update Mood : {}", moodDTO);
        if (moodDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MoodDTO result = moodService.save(moodDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, moodDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /moods} : get all the moods.
     *
     * @param pageable the pagination information.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of moods in body.
     */
    @GetMapping("/moods")
    public ResponseEntity<List<MoodDTO>> getAllMoods(Pageable pageable) {
        log.debug("REST request to get Moods");
        Page<MoodDTO> page = moodQueryService.findByRole(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    /**
    * {@code GET  /moods/count} : count all the moods.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/moods/count")
    public ResponseEntity<Long> countMoods(MoodCriteria criteria) {
        log.debug("REST request to count Moods by criteria: {}" , criteria);
        return ResponseEntity.ok().body(moodQueryService.countByCriteria(criteria));
    }
    /**
     * {@code GET /moods/:plateauName} : get allmoods for a the given plateauName
     *
     * @param plateauName
     *
     * @param id
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} a
     */
    @GetMapping("/moods/plateau/{plateauName}")
    public ResponseEntity<List<MoodDTO>> getMoodsByPlateau(Pageable pageable, @PathVariable String plateauName) {
        log.debug("REST request to get Moods by Plateau: {}", plateauName);
        Page<MoodDTO> page = moodQueryService.findByPlateau( pageable, plateauName);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    /**
     * @param departementName
     * @param pageable
     * @return the {@link ResponseEntity} with status {@code 200 (Ok)}
     */
    @GetMapping("/moods/departement/{departementName}")
    public ResponseEntity<List<MoodDTO>> getMoodsByDepartement(Pageable pageable, @PathVariable String departementName) {
        log.debug("REST request to get Moods by departement: {}", departementName);
        Page<MoodDTO> page = moodQueryService.findByDepartement(pageable, departementName);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    /**
     *
     * @param pageable
     * @param serviceName
     * @return the {@link ResponseEntity} with status {@code 200 (OK)}
     */
    @GetMapping("/moods/service/{serviceName}")
    public ResponseEntity<List<MoodDTO>> getMoodsByService(Pageable pageable, @PathVariable String serviceName) {
        log.debug("REST requet to get Moods by service: {}", serviceName);
        Page<MoodDTO> page = moodQueryService.findByService(pageable, serviceName);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/moods/value/{mood}")
    public ResponseEntity<List<MoodDTO>> getMoodsByvalue(Pageable pageable, @PathVariable Moods mood) {
        log.debug("REST requet to get Moods by mood value {}", mood);
        Page<MoodDTO> page = moodQueryService.findBymood(pageable, mood);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    /**
     * {@code GET  /moods/:id} : get the "id" mood.
     *
     * @param id the id of the moodDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the moodDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/moods/{id}")
    public ResponseEntity<MoodDTO> getMood(@PathVariable Long id) {
        log.debug("REST request to get Mood : {}", id);
        Optional<MoodDTO> moodDTO = moodService.findOne(id);
        return ResponseUtil.wrapOrNotFound(moodDTO);
    }

    /**
     * {@code DELETE  /moods/:id} : delete the "id" mood.
     *
     * @param id the id of the moodDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/moods/{id}")
    public ResponseEntity<Void> deleteMood(@PathVariable Long id) {
        log.debug("REST request to delete Mood : {}", id);
        moodService.delete(id);
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
    public ResponseEntity<List<MoodDTO>> searchMoods(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Moods for query {}", query);
        Page<MoodDTO> page = moodService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
