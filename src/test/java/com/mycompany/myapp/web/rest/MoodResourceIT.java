package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MoodfaceApp;
import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.repository.MoodRepository;
import com.mycompany.myapp.repository.search.MoodSearchRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.Moods;
/**
 * Integration tests for the {@link MoodResource} REST controller.
 */
@SpringBootTest(classes = MoodfaceApp.class)
public class MoodResourceIT {

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    private static final Moods DEFAULT_MOOD = Moods.VERY_HAPPY;
    private static final Moods UPDATED_MOOD = Moods.HAPPY;

    @Autowired
    private MoodRepository moodRepository;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.MoodSearchRepositoryMockConfiguration
     */
    @Autowired
    private MoodSearchRepository mockMoodSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMoodMockMvc;

    private Mood mood;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MoodResource moodResource = new MoodResource(moodRepository, mockMoodSearchRepository);
        this.restMoodMockMvc = MockMvcBuilders.standaloneSetup(moodResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mood createEntity(EntityManager em) {
        Mood mood = new Mood()
            .commentaire(DEFAULT_COMMENTAIRE)
            .mood(DEFAULT_MOOD);
        return mood;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mood createUpdatedEntity(EntityManager em) {
        Mood mood = new Mood()
            .commentaire(UPDATED_COMMENTAIRE)
            .mood(UPDATED_MOOD);
        return mood;
    }

    @BeforeEach
    public void initTest() {
        mood = createEntity(em);
    }

    @Test
    @Transactional
    public void createMood() throws Exception {
        int databaseSizeBeforeCreate = moodRepository.findAll().size();

        // Create the Mood
        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mood)))
            .andExpect(status().isCreated());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeCreate + 1);
        Mood testMood = moodList.get(moodList.size() - 1);
        assertThat(testMood.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testMood.getMood()).isEqualTo(DEFAULT_MOOD);

        // Validate the Mood in Elasticsearch
        verify(mockMoodSearchRepository, times(1)).save(testMood);
    }

    @Test
    @Transactional
    public void createMoodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moodRepository.findAll().size();

        // Create the Mood with an existing ID
        mood.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mood)))
            .andExpect(status().isBadRequest());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeCreate);

        // Validate the Mood in Elasticsearch
        verify(mockMoodSearchRepository, times(0)).save(mood);
    }


    @Test
    @Transactional
    public void checkMoodIsRequired() throws Exception {
        int databaseSizeBeforeTest = moodRepository.findAll().size();
        // set the field null
        mood.setMood(null);

        // Create the Mood, which fails.

        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mood)))
            .andExpect(status().isBadRequest());

        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMoods() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList
        restMoodMockMvc.perform(get("/api/moods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mood.getId().intValue())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE.toString())))
            .andExpect(jsonPath("$.[*].mood").value(hasItem(DEFAULT_MOOD.toString())));
    }
    
    @Test
    @Transactional
    public void getMood() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get the mood
        restMoodMockMvc.perform(get("/api/moods/{id}", mood.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mood.getId().intValue()))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE.toString()))
            .andExpect(jsonPath("$.mood").value(DEFAULT_MOOD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMood() throws Exception {
        // Get the mood
        restMoodMockMvc.perform(get("/api/moods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMood() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        int databaseSizeBeforeUpdate = moodRepository.findAll().size();

        // Update the mood
        Mood updatedMood = moodRepository.findById(mood.getId()).get();
        // Disconnect from session so that the updates on updatedMood are not directly saved in db
        em.detach(updatedMood);
        updatedMood
            .commentaire(UPDATED_COMMENTAIRE)
            .mood(UPDATED_MOOD);

        restMoodMockMvc.perform(put("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMood)))
            .andExpect(status().isOk());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeUpdate);
        Mood testMood = moodList.get(moodList.size() - 1);
        assertThat(testMood.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testMood.getMood()).isEqualTo(UPDATED_MOOD);

        // Validate the Mood in Elasticsearch
        verify(mockMoodSearchRepository, times(1)).save(testMood);
    }

    @Test
    @Transactional
    public void updateNonExistingMood() throws Exception {
        int databaseSizeBeforeUpdate = moodRepository.findAll().size();

        // Create the Mood

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMoodMockMvc.perform(put("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mood)))
            .andExpect(status().isBadRequest());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Mood in Elasticsearch
        verify(mockMoodSearchRepository, times(0)).save(mood);
    }

    @Test
    @Transactional
    public void deleteMood() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        int databaseSizeBeforeDelete = moodRepository.findAll().size();

        // Delete the mood
        restMoodMockMvc.perform(delete("/api/moods/{id}", mood.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Mood in Elasticsearch
        verify(mockMoodSearchRepository, times(1)).deleteById(mood.getId());
    }

    @Test
    @Transactional
    public void searchMood() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);
        when(mockMoodSearchRepository.search(queryStringQuery("id:" + mood.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(mood), PageRequest.of(0, 1), 1));
        // Search the mood
        restMoodMockMvc.perform(get("/api/_search/moods?query=id:" + mood.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mood.getId().intValue())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].mood").value(hasItem(DEFAULT_MOOD.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mood.class);
        Mood mood1 = new Mood();
        mood1.setId(1L);
        Mood mood2 = new Mood();
        mood2.setId(mood1.getId());
        assertThat(mood1).isEqualTo(mood2);
        mood2.setId(2L);
        assertThat(mood1).isNotEqualTo(mood2);
        mood1.setId(null);
        assertThat(mood1).isNotEqualTo(mood2);
    }
}
