package com.coach;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatRepository extends JpaRepository<Stat, Integer> {
    List<Stat> findAllByMemberId(Integer memberId);
}
