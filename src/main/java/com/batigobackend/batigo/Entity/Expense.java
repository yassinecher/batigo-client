package com.batigobackend.batigo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Expense {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Float amount ;

    private Date date;
    @Enumerated(EnumType.STRING)
    private AccountType accountType;
    private String source;
    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account  account;

    public Account getAccount() {
        return account;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType account) {
        this.accountType = account;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

}
