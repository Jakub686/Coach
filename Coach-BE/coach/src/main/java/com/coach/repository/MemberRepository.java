package com.coach.repository;

import com.coach.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findMembersByFirstName(@Param("fistName") String fistName);

    List<Member> findMembersByUserId(@Param("userId") Long userId);
}
