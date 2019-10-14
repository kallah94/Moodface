package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import com.mycompany.myapp.domain.enumeration.Moods;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.Mood} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.MoodResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /moods?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class MoodCriteria implements Serializable, Criteria {
    /**
     * Class for filtering Moods
     */
    public static class MoodsFilter extends Filter<Moods> {

        public MoodsFilter() {
        }

        public MoodsFilter(MoodsFilter filter) {
            super(filter);
        }

        @Override
        public MoodsFilter copy() {
            return new MoodsFilter(this);
        }

    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private MoodsFilter mood;

    private StringFilter comment;

    private LocalDateFilter date;

    private BooleanFilter anonymous;

    private LongFilter userId;

    public MoodCriteria(){
    }

    public MoodCriteria(MoodCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.mood = other.mood == null ? null : other.mood.copy();
        this.comment = other.comment == null ? null : other.comment.copy();
        this.date = other.date == null ? null : other.date.copy();
        this.anonymous = other.anonymous == null ? null : other.anonymous.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
    }

    @Override
    public MoodCriteria copy() {
        return new MoodCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public MoodsFilter getMood() {
        return mood;
    }

    public void setMood(MoodsFilter mood) {
        this.mood = mood;
    }

    public StringFilter getComment() {
        return comment;
    }

    public void setComment(StringFilter comment) {
        this.comment = comment;
    }

    public LocalDateFilter getDate() {
        return date;
    }

    public void setDate(LocalDateFilter date) {
        this.date = date;
    }

    public BooleanFilter getAnonymous() {
        return anonymous;
    }

    public void setAnonymous(BooleanFilter anonymous) {
        this.anonymous = anonymous;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final MoodCriteria that = (MoodCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(mood, that.mood) &&
            Objects.equals(comment, that.comment) &&
            Objects.equals(date, that.date) &&
            Objects.equals(anonymous, that.anonymous) &&
            Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        mood,
        comment,
        date,
        anonymous,
        userId
        );
    }

    @Override
    public String toString() {
        return "MoodCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (mood != null ? "mood=" + mood + ", " : "") +
                (comment != null ? "comment=" + comment + ", " : "") +
                (date != null ? "date=" + date + ", " : "") +
                (anonymous != null ? "anonymous=" + anonymous + ", " : "") +
                (userId != null ? "userId=" + userId + ", " : "") +
            "}";
    }

}
