package com.batigobackend.batigo.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonFormat

    private Long idcommande;
    @JsonFormat

    private String details;

    @Temporal(TemporalType.DATE)
    private Date orderdate;
    @JsonFormat

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    public void setUser(User user) {
        this.user = user;
    }

    @OneToOne(mappedBy = "commande", cascade = CascadeType.ALL)
    private Livraison livraison;

    public enum Status {
        Pending, Processed, Shipped
    }

    public Long getIdcommande() {
        return idcommande;
    }
    public String getDetails() {
        return details;
    }
    public void setDetails(String details) {
        this.details = details;
    }

    public Date getOrderdate() {
        return orderdate;
    }
    public void setOrderdate(Date orderdate) {
        this.orderdate = orderdate;
    }

    public Status getStatus() {
        return this.status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
    public User getUser() {
        return user;
    }
}
