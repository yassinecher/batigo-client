package com.batigobackend.batigo.Controller;

import com.batigobackend.batigo.Entity.Commande;
import com.batigobackend.batigo.Service.ICommandeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Commande")
@CrossOrigin(origins = "http://localhost:4200, http://localhost:53570")
public class CommandeController {


    @Autowired
    private ICommandeService commandeService;


    @GetMapping("/Allcommande")
    public List<Commande> getCommandes() {
        return commandeService.retrieveAllCommandes();
    }


    @GetMapping("/getcommande/{commande-id}")
    public Commande retrieveCommande(@PathVariable("commande-id") Long commandeId) {
        return commandeService.retrieveCommande(commandeId);
    }

        @PostMapping("/addcommande")
    public ResponseEntity<Commande> addCommande(@RequestBody Commande c) {
        Commande createdCommande = commandeService.addCommande(c);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCommande);
    }

    @PutMapping("/modifycommande")
    public Commande modifyCommande(@RequestBody Commande c) {
        return commandeService.modifyCommande(c);
    }

    @DeleteMapping("/removecommande/{commande-id}")
    public void removeCommande(@PathVariable("commande-id") Long commandeId) {
        commandeService.removeCommande(commandeId);
    }
}
