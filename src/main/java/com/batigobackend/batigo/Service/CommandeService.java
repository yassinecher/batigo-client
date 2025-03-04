package com.batigobackend.batigo.Service;

import com.batigobackend.batigo.Entity.Commande;
import com.batigobackend.batigo.Entity.User;
import com.batigobackend.batigo.Repository.CommandeRepository;
import com.batigobackend.batigo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandeService implements ICommandeService {


    @Autowired
    private CommandeRepository commandeRepository; // Injection avec @Autowired
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Commande> retrieveAllCommandes() {
        return commandeRepository.findAll();
    }

    @Override
    public Commande retrieveCommande(Long commandeId) {
        return commandeRepository.findById(commandeId).orElse(null);
    }

    @Override
    public Commande addCommande(Commande c) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Récupérer le nom d'utilisateur

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        c.setUser(user);
        return commandeRepository.save(c);
    }

    @Override
    public Commande modifyCommande(Commande c) {
        // Fetch the existing Commande from the repository by its ID
        Commande existingCommande = commandeRepository.findById(c.getIdcommande())
                .orElseThrow(() -> new RuntimeException("Commande not found"));

        // Ensure the user is set correctly. You can either preserve the existing user
        // or allow updating it if it's part of the request.
        if (c.getUser() != null) {
            User user = userRepository.findById(c.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            existingCommande.setUser(user);
        }

        // Update other fields
        existingCommande.setDetails(c.getDetails());
        existingCommande.setOrderdate(c.getOrderdate());
        existingCommande.setStatus(c.getStatus());

        // Save the updated Commande
        return commandeRepository.save(existingCommande);
    }

    @Override
    public void removeCommande(Long commandeId) {
        commandeRepository.deleteById(commandeId);
    }
}
