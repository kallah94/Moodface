package com.mycompany.myapp.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.UserDTO;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    String USERS_BY_LOGIN_CACHE = "usersByLogin";

    String USERS_BY_EMAIL_CACHE = "usersByEmail";

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "authorities")
    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneWithAuthoritiesByEmailIgnoreCase(String email);

    Page<User> findAllByLoginNot(Pageable pageable, String login);


    @Query("select user from User user where user.serviceName = :serviceName")
    Page<UserDTO> findAllByServiceName(@Param("serviceName") String serviceName, Pageable pageable);

    @Query("select user from User user where user.departementName = :departementName")
    Page<UserDTO> findAllByDepartementName(@Param("departementName") String departementName, Pageable pageable);

    @Query("select user from User user where user.plateauName = :plateauName")
    Page<UserDTO> findAllByPlateauName(@Param("plateauName") String plateauName, Pageable pageable);

    @Query("select user.plateauName from User user")
    List<String> findAllPlateauName();

    @Query("select user.serviceName from User user")
    List<String> findAllServiceName();

    @Query("select user.departementName from User user")
    List<String> findAllDepartementName();

}
