package esprit.gestionprojetpi.Controllers;

import esprit.gestionprojetpi.Entities.Livrable;
import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Entities.Statut;
import esprit.gestionprojetpi.Repositories.ProjetRepository;
import esprit.gestionprojetpi.Services.LivrableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/livrables")


public class LivrableController {

    @Autowired
    private LivrableService livrableService;
    @Autowired
    private ProjetRepository projetRepository;
    // Create or update a deliverable
    @PostMapping
    public ResponseEntity<Livrable> createOrUpdateLivrable(@RequestBody Livrable livrable) {
        Livrable savedLivrable = livrableService.saveLivrable(livrable);
        return ResponseEntity.ok(savedLivrable);
    }



    // Get all deliverables
    @GetMapping("/all")
    public ResponseEntity<List<Livrable>> getAllLivrables() {
        return ResponseEntity.ok(livrableService.getAllLivrables());
    }

    // Get a single deliverable by ID
    @GetMapping("/{id}")
    public ResponseEntity<Livrable> getLivrableById(@PathVariable Long id) {
        Optional<Livrable> livrable = livrableService.getLivrableById(id);
        return livrable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livrable> updateLivrable(@PathVariable Long id, @RequestBody Livrable updatedLivrable) {
        Livrable savedLivrable = livrableService.updateLivrable(id, updatedLivrable);
        return ResponseEntity.ok(savedLivrable);
    }


    // Get all deliverables for a specific project
    @GetMapping("/projet/{projetId}")
    public ResponseEntity<List<Livrable>> getLivrablesByProjetId(@PathVariable Long projetId) {
        return ResponseEntity.ok(livrableService.getLivrablesByProjetId(projetId));
    }

    // Delete a deliverable by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivrable(@PathVariable Long id) {
        livrableService.deleteLivrable(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Livrable> createLivrable(@RequestBody Map<String, Object> request) {
        System.out.println("Received Request: " + request);

        if (!request.containsKey("projetId")) {
            throw new RuntimeException("projetId is missing!");
        }

        Long projetId = Long.valueOf(request.get("projetId").toString());
        Projet projet = projetRepository.findById(projetId)
                .orElseThrow(() -> new RuntimeException("Project not found: " + projetId));

        Livrable livrable = new Livrable();
        livrable.setNom(request.get("nom").toString());
        livrable.setType(request.get("type").toString());
        livrable.setStatut(Statut.valueOf(request.get("statut").toString()));
        livrable.setDateRemisePrevue(LocalDate.parse(request.get("dateRemisePrevue").toString()));
        livrable.setDateRemiseReelle(request.get("dateRemiseReelle") != null ? LocalDate.parse(request.get("dateRemiseReelle").toString()) : null);
        livrable.setCommentaire(request.get("commentaire") != null ? request.get("commentaire").toString() : null);
        livrable.setProjet(projet); // ✅ Link Livrable to Project

        Livrable savedLivrable = livrableService.createLivrable(livrable);
        return ResponseEntity.ok(savedLivrable);
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<Livrable> updateLivrableStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Livrable updatedLivrable = livrableService.updateLivrableStatus(id, request.get("statut"));
        return ResponseEntity.ok(updatedLivrable);
    }


}
