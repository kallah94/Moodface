package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;

import com.mycompany.myapp.domain.enumeration.Moods;

/**
 * A Mood.
 */
@Entity
@Table(name = "mood")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mood")
public class Mood implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "mood", nullable = false)
    private Moods mood;

    @Column(name = "comment")
    private String comment;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("moods")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Moods getMood() {
        return mood;
    }

    public Mood mood(Moods mood) {
        this.mood = mood;
        return this;
    }

    public void setMood(Moods mood) {
        this.mood = mood;
    }

    public String getComment() {
        return comment;
    }

    public Mood comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getDate() {
        return date;
    }

    public Mood date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public Mood user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mood)) {
            return false;
        }
        return id != null && id.equals(((Mood) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Mood{" +
            "id=" + getId() +
            ", mood='" + getMood() + "'" +
            ", comment='" + getComment() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
