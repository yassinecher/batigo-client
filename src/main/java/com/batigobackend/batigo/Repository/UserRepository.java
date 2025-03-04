package com.batigobackend.batigo.Repository;

import com.batigobackend.batigo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

Optional<User> findByEmail(String email);

}
