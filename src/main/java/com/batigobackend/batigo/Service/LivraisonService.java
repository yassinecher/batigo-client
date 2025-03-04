package com.batigobackend.batigo.Service;

import com.batigobackend.batigo.Entity.Commande;
import com.batigobackend.batigo.Entity.Livraison;
import com.batigobackend.batigo.Repository.CommandeRepository;
import com.batigobackend.batigo.Repository.LivraisonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivraisonService implements ILivraisonService {

    @Autowired
    private LivraisonRepository livraisonRepository;

    @Autowired
    private CommandeRepository commandeRepository;  // Add this to manage the Commande entity

    @Override
    public List<Livraison> retrieveAlllivraisons() {
        return livraisonRepository.findAll();
    }

    @Override
    public Livraison retrievelivraison(Long livraisonId) {
        return livraisonRepository.findById(livraisonId).orElse(null);
    }

    @Override
    public Livraison addlivraison(Livraison livraison) {
        // Check if the Commande exists
        if (livraison.getCommande() == null || livraison.getCommande().getIdcommande() == null) {
            throw new IllegalArgumentException("Commande must be provided");
        }

        Commande commande = commandeRepository.findById(livraison.getCommande().getIdcommande())
                .orElseThrow(() -> new IllegalArgumentException("Commande not found"));

        System.out.println("Commande found: " + commande);  // Debugging line

        // Set the commande to livraison
        livraison.setCommande(commande);

        // Save the livraison and return
        return livraisonRepository.save(livraison);
    }


    @Override
    public void removelivraison(Long livraisonId) {
        livraisonRepository.deleteById(livraisonId);
    }

    @Override
    public Livraison modifylivraison(Livraison livraison) {
        // Retrieve the existing Livraison
        Livraison existingLivraison = livraisonRepository.findById(livraison.getId())
                .orElseThrow(() -> new IllegalArgumentException("Livraison not found"));

        // Dynamically update fields that are passed in the request
        if (livraison.getStatusl() != null) {
            existingLivraison.setStatusl(livraison.getStatusl());
        }
        if (livraison.getOrderdate() != null) {
            existingLivraison.setOrderdate(livraison.getOrderdate());
        }

        if (livraison.getCommande() != null && livraison.getCommande().getIdcommande() != null) {
            Commande commande = commandeRepository.findById(livraison.getCommande().getIdcommande()).orElse(null);
            if (commande != null) {
                existingLivraison.setCommande(commande);  // Dynamically set the Commande if present
            } else {
                throw new IllegalArgumentException("Commande not found");
            }
        }

        // Add more fields here as needed for dynamic updates

        return livraisonRepository.save(existingLivraison);
    }

}
