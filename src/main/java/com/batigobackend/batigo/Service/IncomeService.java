package com.batigobackend.batigo.Service;



import com.batigobackend.batigo.Entity.Income;
import com.batigobackend.batigo.Repository.ExpenseRepository;
import com.batigobackend.batigo.Repository.IncomeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
 public class IncomeService implements Iservice {
    private final IncomeRepository incomeRepository;

    @Autowired
    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }


    @Override
    public Income add(Income income) {
        return incomeRepository.save(income);
    }

    @Override
    public void delete(int id) {
        incomeRepository.deleteById(id);

    }
    @Override
    public  Income edit(Income income) {
      Income income1 = incomeRepository.save(income);
        return income1;
    }

    @Override
    public List<Income> findAll() {
        return incomeRepository.findAll();
    }

    @Override
    public Income findById(int id) {
        return incomeRepository.findById(id).get();
    }


}
