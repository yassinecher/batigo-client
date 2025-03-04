package com.batigobackend.batigo.Service;


 import com.batigobackend.batigo.Entity.Expense;
 import com.batigobackend.batigo.Repository.ExpenseRepository;
 import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ExpenseService implements Eservice {
    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    @Override
    public List<Expense> findAll() {
        return expenseRepository.findAll();

    }

    @Override
    public Expense findById(int id) {
        return expenseRepository.findById(id).get();
    }

    @Override
    public Expense add(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public void delete(int id) {
        expenseRepository.deleteById(id);

    }

    @Override
    public Expense edit(Expense expense) {
        return expenseRepository.save(expense);
    }
}
