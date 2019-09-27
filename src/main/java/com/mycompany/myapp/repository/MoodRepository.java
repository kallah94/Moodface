package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.service.dto.MoodDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Mood entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MoodRepository extends JpaRepository<Mood, Long>, JpaSpecificationExecutor<Mood> {

/**
 * modify this metjode to return moods by page
 * @return
 */
    @Query("select mood from Mood mood where mood.user.login = ?#{principal.username}")
    Page<Mood> findByUserIsCurrentUser(Pageable arg0);
}
