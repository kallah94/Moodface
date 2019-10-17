package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;

import com.mycompany.myapp.Moodface1App;
import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.enumeration.Moods;
import com.mycompany.myapp.repository.MoodRepository;
import com.mycompany.myapp.repository.search.MoodSearchRepository;
import com.mycompany.myapp.service.MoodQueryService;
import com.mycompany.myapp.service.MoodService;
import com.mycompany.myapp.service.dto.MoodDTO;
import com.mycompany.myapp.service.mapper.MoodMapper;
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
/**
 * Integration tests for the {@link MoodResource} REST controller.
 */
@SpringBootTest(classes = Moodface1App.class)
public class MoodResourceIT {

    private static final Moods DEFAULT_MOOD = Moods.VERY_HAPPY;
    private static final Moods UPDATED_MOOD = Moods.HAPPY;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_DATE = LocalDate.ofEpochDay(-1L);

    private static final Boolean DEFAULT_ANONYMOUS = false;
    private static final Boolean UPDATED_ANONYMOUS = true;

    @Autowired
    private MoodRepository moodRepository;

    @Autowired
    private MoodMapper moodMapper;

    @Autowired
    private MoodService moodService;

    /**
     * This repository is mocked in the com.mycompany.myapp.repository.search test package.
     *
     * @see com.mycompany.myapp.repository.search.MoodSearchRepositoryMockConfiguration
     */
    @Autowired
    private MoodSearchRepository mockMoodSearchRepository;

    @Autowired
    private MoodQueryService moodQueryService;

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
        final MoodResource moodResource = new MoodResource(moodService, moodQueryService);
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
            .mood(DEFAULT_MOOD)
            .comment(DEFAULT_COMMENT)
            .date(DEFAULT_DATE)
            .anonymous(DEFAULT_ANONYMOUS);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        mood.setUser(user);
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
            .mood(UPDATED_MOOD)
            .comment(UPDATED_COMMENT)
            .date(UPDATED_DATE)
            .anonymous(UPDATED_ANONYMOUS);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        mood.setUser(user);
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
        MoodDTO moodDTO = moodMapper.toDto(mood);
        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isCreated());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeCreate + 1);
        Mood testMood = moodList.get(moodList.size() - 1);
        assertThat(testMood.getMood()).isEqualTo(DEFAULT_MOOD);
        assertThat(testMood.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testMood.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testMood.isAnonymous()).isEqualTo(DEFAULT_ANONYMOUS);

        // Validate the Mood in Elasticsearch
        verify(mockMoodSearchRepository, times(1)).save(testMood);
    }

    @Test
    @Transactional
    public void createMoodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moodRepository.findAll().size();

        // Create the Mood with an existing ID
        mood.setId(1L);
        MoodDTO moodDTO = moodMapper.toDto(mood);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
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
        MoodDTO moodDTO = moodMapper.toDto(mood);

        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isBadRequest());

        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = moodRepository.findAll().size();
        // set the field null
        mood.setDate(null);

        // Create the Mood, which fails.
        MoodDTO moodDTO = moodMapper.toDto(mood);

        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
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
            .andExpect(jsonPath("$.[*].mood").value(hasItem(DEFAULT_MOOD.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].anonymous").value(hasItem(DEFAULT_ANONYMOUS.booleanValue())));
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
            .andExpect(jsonPath("$.mood").value(DEFAULT_MOOD.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.anonymous").value(DEFAULT_ANONYMOUS.booleanValue()));
    }

    @Test
    @Transactional
    public void getAllMoodsByMoodIsEqualToSomething() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where mood equals to DEFAULT_MOOD
        defaultMoodShouldBeFound("mood.equals=" + DEFAULT_MOOD);

        // Get all the moodList where mood equals to UPDATED_MOOD
        defaultMoodShouldNotBeFound("mood.equals=" + UPDATED_MOOD);
    }

    @Test
    @Transactional
    public void getAllMoodsByMoodIsInShouldWork() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where mood in DEFAULT_MOOD or UPDATED_MOOD
        defaultMoodShouldBeFound("mood.in=" + DEFAULT_MOOD + "," + UPDATED_MOOD);

        // Get all the moodList where mood equals to UPDATED_MOOD
        defaultMoodShouldNotBeFound("mood.in=" + UPDATED_MOOD);
    }

    @Test
    @Transactional
    public void getAllMoodsByMoodIsNullOrNotNull() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where mood is not null
        defaultMoodShouldBeFound("mood.specified=true");

        // Get all the moodList where mood is null
        defaultMoodShouldNotBeFound("mood.specified=false");
    }

    @Test
    @Transactional
    public void getAllMoodsByCommentIsEqualToSomething() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where comment equals to DEFAULT_COMMENT
        defaultMoodShouldBeFound("comment.equals=" + DEFAULT_COMMENT);

        // Get all the moodList where comment equals to UPDATED_COMMENT
        defaultMoodShouldNotBeFound("comment.equals=" + UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void getAllMoodsByCommentIsInShouldWork() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where comment in DEFAULT_COMMENT or UPDATED_COMMENT
        defaultMoodShouldBeFound("comment.in=" + DEFAULT_COMMENT + "," + UPDATED_COMMENT);

        // Get all the moodList where comment equals to UPDATED_COMMENT
        defaultMoodShouldNotBeFound("comment.in=" + UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void getAllMoodsByCommentIsNullOrNotNull() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where comment is not null
        defaultMoodShouldBeFound("comment.specified=true");

        // Get all the moodList where comment is null
        defaultMoodShouldNotBeFound("comment.specified=false");
    }

    @Test
    @Transactional
    public void getAllMoodsByDateIsEqualToSomething() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where date equals to DEFAULT_DATE
        defaultMoodShouldBeFound("date.equals=" + DEFAULT_DATE);

        // Get all the moodList where date equals to UPDATED_DATE
        defaultMoodShouldNotBeFound("date.equals=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    public void getAllMoodsByDateIsInShouldWork() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where date in DEFAULT_DATE or UPDATED_DATE
        defaultMoodShouldBeFound("date.in=" + DEFAULT_DATE + "," + UPDATED_DATE);

        // Get all the moodList where date equals to UPDATED_DATE
        defaultMoodShouldNotBeFound("date.in=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    public void getAllMoodsByDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where date is not null
        defaultMoodShouldBeFound("date.specified=true");

        // Get all the moodList where date is null
        defaultMoodShouldNotBeFound("date.specified=false");
    }

    @Test
    @Transactional
    public void getAllMoodsByDateIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where date is greater than or equal to DEFAULT_DATE
        defaultMoodShouldBeFound("date.greaterThanOrEqual=" + DEFAULT_DATE);

        // Get all the moodList where date is greater than or equal to UPDATED_DATE
        defaultMoodShouldNotBeFound("date.greaterThanOrEqual=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    public void getAllMoodsByDateIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where date is less than or equal to DEFAULT_DATE
        defaultMoodShouldBeFound("date.lessThanOrEqual=" + DEFAULT_DATE);

        // Get all the moodList where date is less than or equal to SMALLER_DATE
        defaultMoodShouldNotBeFound("date.lessThanOrEqual=" + SMALLER_DATE);
    }

    @Test
    @Transactional
    public void getAllMoodsByDateIsLessThanSomething() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where date is less than DEFAULT_DATE
        defaultMoodShouldNotBeFound("date.lessThan=" + DEFAULT_DATE);

        // Get all the moodList where date is less than UPDATED_DATE
        defaultMoodShouldBeFound("date.lessThan=" + UPDATED_DATE);
    }

    @Test
    @Transactional
    public void getAllMoodsByDateIsGreaterThanSomething() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where date is greater than DEFAULT_DATE
        defaultMoodShouldNotBeFound("date.greaterThan=" + DEFAULT_DATE);

        // Get all the moodList where date is greater than SMALLER_DATE
        defaultMoodShouldBeFound("date.greaterThan=" + SMALLER_DATE);
    }


    @Test
    @Transactional
    public void getAllMoodsByAnonymousIsEqualToSomething() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where anonymous equals to DEFAULT_ANONYMOUS
        defaultMoodShouldBeFound("anonymous.equals=" + DEFAULT_ANONYMOUS);

        // Get all the moodList where anonymous equals to UPDATED_ANONYMOUS
        defaultMoodShouldNotBeFound("anonymous.equals=" + UPDATED_ANONYMOUS);
    }

    @Test
    @Transactional
    public void getAllMoodsByAnonymousIsInShouldWork() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where anonymous in DEFAULT_ANONYMOUS or UPDATED_ANONYMOUS
        defaultMoodShouldBeFound("anonymous.in=" + DEFAULT_ANONYMOUS + "," + UPDATED_ANONYMOUS);

        // Get all the moodList where anonymous equals to UPDATED_ANONYMOUS
        defaultMoodShouldNotBeFound("anonymous.in=" + UPDATED_ANONYMOUS);
    }

    @Test
    @Transactional
    public void getAllMoodsByAnonymousIsNullOrNotNull() throws Exception {
        // Initialize the database
        moodRepository.saveAndFlush(mood);

        // Get all the moodList where anonymous is not null
        defaultMoodShouldBeFound("anonymous.specified=true");

        // Get all the moodList where anonymous is null
        defaultMoodShouldNotBeFound("anonymous.specified=false");
    }

    @Test
    @Transactional
    public void getAllMoodsByUserIsEqualToSomething() throws Exception {
        // Get already existing entity
        User user = mood.getUser();
        moodRepository.saveAndFlush(mood);
        Long userId = user.getId();

        // Get all the moodList where user equals to userId
        defaultMoodShouldBeFound("userId.equals=" + userId);

        // Get all the moodList where user equals to userId + 1
        defaultMoodShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultMoodShouldBeFound(String filter) throws Exception {
        restMoodMockMvc.perform(get("/api/moods?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mood.getId().intValue())))
            .andExpect(jsonPath("$.[*].mood").value(hasItem(DEFAULT_MOOD.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].anonymous").value(hasItem(DEFAULT_ANONYMOUS.booleanValue())));

        // Check, that the count call also returns 1
        restMoodMockMvc.perform(get("/api/moods/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultMoodShouldNotBeFound(String filter) throws Exception {
        restMoodMockMvc.perform(get("/api/moods?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restMoodMockMvc.perform(get("/api/moods/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
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
            .mood(UPDATED_MOOD)
            .comment(UPDATED_COMMENT)
            .date(UPDATED_DATE)
            .anonymous(UPDATED_ANONYMOUS);
        MoodDTO moodDTO = moodMapper.toDto(updatedMood);

        restMoodMockMvc.perform(put("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isOk());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeUpdate);
        Mood testMood = moodList.get(moodList.size() - 1);
        assertThat(testMood.getMood()).isEqualTo(UPDATED_MOOD);
        assertThat(testMood.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testMood.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testMood.isAnonymous()).isEqualTo(UPDATED_ANONYMOUS);

        // Validate the Mood in Elasticsearch
        verify(mockMoodSearchRepository, times(1)).save(testMood);
    }

    @Test
    @Transactional
    public void updateNonExistingMood() throws Exception {
        int databaseSizeBeforeUpdate = moodRepository.findAll().size();

        // Create the Mood
        MoodDTO moodDTO = moodMapper.toDto(mood);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMoodMockMvc.perform(put("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
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
            .andExpect(jsonPath("$.[*].mood").value(hasItem(DEFAULT_MOOD.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].anonymous").value(hasItem(DEFAULT_ANONYMOUS.booleanValue())));
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

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MoodDTO.class);
        MoodDTO moodDTO1 = new MoodDTO();
        moodDTO1.setId(1L);
        MoodDTO moodDTO2 = new MoodDTO();
        assertThat(moodDTO1).isNotEqualTo(moodDTO2);
        moodDTO2.setId(moodDTO1.getId());
        assertThat(moodDTO1).isEqualTo(moodDTO2);
        moodDTO2.setId(2L);
        assertThat(moodDTO1).isNotEqualTo(moodDTO2);
        moodDTO1.setId(null);
        assertThat(moodDTO1).isNotEqualTo(moodDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(moodMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(moodMapper.fromId(null)).isNull();
    }
}
