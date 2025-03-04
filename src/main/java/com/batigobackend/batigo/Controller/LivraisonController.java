package com.batigobackend.batigo.Controller;

import com.batigobackend.batigo.Entity.Livraison;
import com.batigobackend.batigo.Service.ILivraisonService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Livraison")
@CrossOrigin(origins = "http://localhost:4200,http://localhost:53570")
public class LivraisonController {

    @Autowired
    private ILivraisonService livraisonService;

    @GetMapping("/AllLivraison")
    public List<Livraison> getLivraisons() {
        return livraisonService.retrieveAlllivraisons();
    }

    @GetMapping("/getlivraison/{livraison-id}")
    public Livraison retrieveLivraison(@PathVariable("livraison-id") Long livraisonId) {
        return livraisonService.retrievelivraison(livraisonId);
    }

    @PostMapping("/addlivraison")
    public Livraison addLivraison(@RequestBody Livraison livraison) {
        return livraisonService.addlivraison(livraison);
    }

    @PutMapping("/modifylivraison")
    public Livraison modifyLivraison(@RequestBody Livraison livraison) {
        return livraisonService.modifylivraison(livraison);
    }

    @DeleteMapping("/removelivraison/{livraison-id}")
    public void removeLivraison(@PathVariable("livraison-id") Long livraisonId) {
        livraisonService.removelivraison(livraisonId);
    }
}
