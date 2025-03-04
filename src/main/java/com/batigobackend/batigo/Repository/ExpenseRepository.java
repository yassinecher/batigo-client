package com.batigobackend.batigo.Repository;

 import com.batigobackend.batigo.Entity.Expense;
  import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository  extends JpaRepository<Expense, Integer> {
}
