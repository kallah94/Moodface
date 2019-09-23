package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.mycompany.myapp.domain.enumeration.Moods;

/**
 * A Mood.
 */
@Entity
@Table(name = "mood")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "mood")
public class Mood implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "commentaire")
    private String commentaire;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "mood", nullable = false)
    private Moods mood;

    @ManyToOne
    @JsonIgnoreProperties("moods")
    private User agent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Mood commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
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

    public User getAgent() {
        return agent;
    }

    public Mood agent(User user) {
        this.agent = user;
        return this;
    }

    public void setAgent(User user) {
        this.agent = user;
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
            ", commentaire='" + getCommentaire() + "'" +
            ", mood='" + getMood() + "'" +
            "}";
    }
}
