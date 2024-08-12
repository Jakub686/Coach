package com.coach;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "members_seq")
    @SequenceGenerator(name = "members_seq", sequenceName = "members_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(nullable = false, updatable = false)
    private LocalDateTime created = LocalDateTime.now();

    private Integer phone;

    private String email;

    @OneToOne
    @JoinColumn(name = "goal_id", referencedColumnName = "id")
    private Goal goal;

    private LocalDate birthday;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

}
