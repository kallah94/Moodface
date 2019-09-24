package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Mood;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Mood entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MoodRepository extends JpaRepository<Mood, Long> {

    @Query("select mood from Mood mood where mood.agent.login = ?#{principal.username}")
    List<Mood> findByAgentIsCurrentUser();

}
