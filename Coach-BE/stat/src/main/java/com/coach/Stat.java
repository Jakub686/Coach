package com.coach;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Stat {

    @Id
    @GeneratedValue
    private Integer id;
    private String weight;

    private Integer memberId;
}
