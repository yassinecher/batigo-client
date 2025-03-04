package com.batigobackend.batigo.Service;



import com.batigobackend.batigo.Entity.Expense;

import java.util.List;

public interface Eservice {

    List<Expense> findAll();

    Expense findById(int id);

    Expense add(Expense expense);

    void delete(int id);

    Expense edit(Expense expense);

}
