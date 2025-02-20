package esprit.gestionprojetpi.Controllers;

import esprit.gestionprojetpi.Entities.Livrable;
import esprit.gestionprojetpi.Services.LivrableService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/livrables")
@AllArgsConstructor
@CrossOrigin("*") // Allow all origins (for frontend testing)

public class LivrableController {
    @Autowired
    private LivrableService livrableService;

    @PostMapping("/creer")
    public Livrable creerLivrable(@RequestBody Livrable livrable) {
        return livrableService.creerLivrable(livrable);
    }

    @GetMapping("/lister")
    public List<Livrable> listerLivrables() {
        return livrableService.listerLivrables();
    }

    @GetMapping("/obtenir/{id}")
    public ResponseEntity<Livrable> obtenirLivrableParId(@PathVariable Long id) {
        return livrableService.obtenirLivrableParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }



    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimerLivrable(@PathVariable Long id) {
        livrableService.supprimerLivrable(id);
        return ResponseEntity.noContent().build();
    }
}