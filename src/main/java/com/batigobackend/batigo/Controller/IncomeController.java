package com.batigobackend.batigo.Controller;
import java.util.List;

import com.batigobackend.batigo.Entity.Income;
import com.batigobackend.batigo.Service.ExpenseService;
import com.batigobackend.batigo.Service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
@Tag(name = "Income")
@RestController
 @RequestMapping("/income")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @PostMapping("/add")
    public Income add(@RequestBody Income e) {
        return incomeService.add( e);
    }



    @GetMapping
    public List<Income> index() {
        return incomeService.findAll();
    }




    @PutMapping("/edit")
    public Income edit(@RequestBody Income income) {
        Income income1 = incomeService.edit(income);
        return income1;
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        incomeService.delete(id);

    }


    @GetMapping("/{id}")
    public Income show(@PathVariable int id) {
        return incomeService.findById(id);
    }














}
