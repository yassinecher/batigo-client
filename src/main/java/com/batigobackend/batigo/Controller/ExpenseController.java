package com.batigobackend.batigo.Controller;


import java.util.List;


import com.batigobackend.batigo.Entity.Expense;
import com.batigobackend.batigo.Entity.Income;
import com.batigobackend.batigo.Service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

@RestController
 @RequestMapping("/expense")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }


    @GetMapping
    public List<Expense> index() {
        return expenseService.findAll();
    }


    @PostMapping("/add")
    public Expense add(@RequestBody Expense expense) {
      //  System.out.println(expense.getAmount());

        return expenseService.add(expense);
    }
    @PutMapping("/edit")
    public Expense edit(@RequestBody Expense expense) {
        Expense expense1 = expenseService.edit(expense);
        return expense1;
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        expenseService.delete(id);

    }


    @GetMapping("/{id}")
    public Expense show(@PathVariable int id) {
        return expenseService.findById(id);
    }





}
