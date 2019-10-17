package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.domain.enumeration.Moods;
import com.mycompany.myapp.service.dto.MoodDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.lang.Nullable;

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

/* cette requette permettent de recuperer toutes les moods via la valeur */
   @Query(value = "select mood from Mood mood WHERE mood.mood = :mood")
   Page<Mood> findByMoodValue(@Param("mood") Moods mood, Pageable pageable);

   @Query(value = "select mood from Mood mood WHERE mood.mood = :mood")
   List<Mood> findByMoodValue(@Param("mood") Moods mood);

    @Query("select mood from Mood mood where mood.user.plateauName = :plateauName")
    Page<Mood> findByPlateauName(@Param("plateauName") String plateauName, Pageable arg0);

    @Query("select mood from Mood mood where mood.user.plateauName = :plateauName")
    List<Mood> findByPlateauName(@Param("plateauName") String plateauName);

    @Query("select mood from Mood mood where mood.user.departementName = :departementName")
    Page<Mood> findByDepartementName(@Param("departementName") String departementName, Pageable arg0);

    @Query("select mood from Mood mood where mood.user.departementName = :departementName")
    List<Mood> findByDepartementName(@Param("departementName") String departementName);

    @Query("select mood from Mood mood where mood.user.serviceName = :serviceName")
    Page<Mood> findByServiceName(@Param("serviceName") String serviceName, Pageable arg0);

    @Query("select mood from Mood mood where mood.user.serviceName = :serviceName")
    List<Mood> findByServiceName(@Param("serviceName") String serviceName);

}
