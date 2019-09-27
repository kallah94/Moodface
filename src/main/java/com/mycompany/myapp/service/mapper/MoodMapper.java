package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.MoodDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Mood} and its DTO {@link MoodDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface MoodMapper extends EntityMapper<MoodDTO, Mood> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    MoodDTO toDto(Mood mood);

    @Mapping(source = "userId", target = "user")
    Mood toEntity(MoodDTO moodDTO);

    default Mood fromId(Long id) {
        if (id == null) {
            return null;
        }
        Mood mood = new Mood();
        mood.setId(id);
        return mood;
    }
}
