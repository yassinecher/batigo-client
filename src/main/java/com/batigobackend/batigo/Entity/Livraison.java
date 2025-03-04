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
public class Livraison {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonFormat

    public Long id;

    @JsonFormat
    @Enumerated(EnumType.STRING)
    public StatusL statusl;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    public Date orderdate;

    @OneToOne
    @JoinColumn(name = "commande_id", referencedColumnName = "idcommande")
    private Commande commande;
    public enum StatusL {
        Shipped,Delivered,Returned
    }
    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for status
    public StatusL getStatusl() {
        return statusl;
    }

    public void setStatusl(StatusL statusl) {
        this.statusl = statusl;
    }

    // Getter and Setter for orderdate
    public Date getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(Date orderdate) {
        this.orderdate = orderdate;
    }

    // Getter and Setter for commande
    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

}
