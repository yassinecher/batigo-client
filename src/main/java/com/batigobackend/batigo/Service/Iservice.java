package com.batigobackend.batigo.Service;



import com.batigobackend.batigo.Entity.Income;

import java.util.List;

public interface Iservice {

    List<Income> findAll();

    Income findById(int id);

    Income add(Income income);

    void delete(int id);

    Income edit(Income income);


}
