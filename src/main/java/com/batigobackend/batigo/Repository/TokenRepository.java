package com.batigobackend.batigo.Repository;

import com.batigobackend.batigo.Entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

  @Query(value = """
      select t from Token t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
  List<Token> findAllValidTokenByUser(Integer id);
  @Modifying
  @Query("DELETE FROM User e WHERE e.id = :id")
  void deleteByUserId(@Param("id") Long id);
  Optional<Token> findByToken(String token);
}
