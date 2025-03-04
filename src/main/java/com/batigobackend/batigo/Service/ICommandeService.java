package com.batigobackend.batigo.Service;

import com.batigobackend.batigo.Entity.Commande;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface ICommandeService {
    List<Commande> retrieveAllCommandes();
    Commande retrieveCommande(Long commandeId);
    Commande addCommande(Commande c);
    Commande modifyCommande(Commande c);
    void removeCommande(Long commandeId);

}
