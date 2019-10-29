package com.mycompany.myapp.repository;

import java.time.LocalDate;
import java.util.List;

import com.mycompany.myapp.domain.Mood;
import com.mycompany.myapp.domain.enumeration.Moods;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Mood entity.
 */

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

    @Query("select mood.comment from Mood mood where mood.user.departementName = :departementName and mood.date = :date")
    List<String> findCommentsByDepartementName(@Param("departementName") String departementName, @Param("date") LocalDate date);

    @Query("select mood.comment from Mood mood where mood.user.serviceName = :serviceName and mood.date = :date")
    List<String> findCommentsByServiceName(@Param("serviceName") String serviceName, @Param("date") LocalDate date);

    @Query("select mood.comment from Mood mood where mood.user.plateauName = :plateauName and mood.date = :date")
    List<String> findCommentsByPlateauName(@Param("plateauName") String plateauName, @Param("date") LocalDate date);

}
