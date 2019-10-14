package com.mycompany.myapp.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.mycompany.myapp.domain.enumeration.Moods;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Mood} entity.
 */
public class MoodDTO implements Serializable {

    private Long id;

    @NotNull
    private Moods mood;

    private String comment;

    @NotNull
    private LocalDate date;

    private Boolean anonymous;


    private Long userId;

    private String userLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Moods getMood() {
        return mood;
    }

    public void setMood(Moods mood) {
        this.mood = mood;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean isAnonymous() {
        return anonymous;
    }

    public void setAnonymous(Boolean anonymous) {
        this.anonymous = anonymous;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MoodDTO moodDTO = (MoodDTO) o;
        if (moodDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), moodDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MoodDTO{" +
            "id=" + getId() +
            ", mood='" + getMood() + "'" +
            ", comment='" + getComment() + "'" +
            ", date='" + getDate() + "'" +
            ", anonymous='" + isAnonymous() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
