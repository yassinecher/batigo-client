package com.batigobackend.batigo.Controller;

import com.batigobackend.batigo.Entity.Account;
 import com.batigobackend.batigo.Service.AccountService;
 import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Account")
public class AccountController {



    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }


    @GetMapping
    public List<Account> index() {
        return accountService.findAll();
    }


    @PostMapping("/add")
    public Account add(@RequestBody Account account) {

        return accountService.add(account);
    }
    @PutMapping("/edit")
    public Account edit(@RequestBody Account account) {
        Account account1 = accountService.edit(account);
        return account1;
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        accountService.delete(id);

    }


    @GetMapping("/{id}")
    public Account show(@PathVariable int id) {
        return accountService.findById(id);
    }



}
