package com.batigobackend.batigo.Service;

import com.batigobackend.batigo.Entity.Account;
import com.batigobackend.batigo.Repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements IAcccountService  {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Account findById(int id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public Account add(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public void delete(int id) {
        accountRepository.deleteById(id);

    }

    @Override
    public Account edit(Account account) {
        return accountRepository.save(account);    }


}
