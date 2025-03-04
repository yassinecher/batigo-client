package com.batigobackend.batigo.Service;




import com.batigobackend.batigo.Entity.Account;
import com.batigobackend.batigo.Entity.Expense;
import com.batigobackend.batigo.Entity.Income;

import java.util.List;
public interface IAcccountService {

    List<Account> findAll();

    Account findById(int id);

    Account add(Account account);

    void delete(int id);

    Account edit(Account account);

}
