package esprit.gestionprojetpi.Controllers;

import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Services.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/projets")
public class ProjetController {

    @Autowired
    private ProjetService projetService;

    // Create or update a project
    @PostMapping
    public ResponseEntity<Projet> saveProjet(@RequestBody Projet projet) {
        return ResponseEntity.ok(projetService.saveProjet(projet));
    }

    // Get all approved projects for front office
    @GetMapping
    public ResponseEntity<List<Projet>> getApprovedProjects() {
        return ResponseEntity.ok(projetService.getApprovedProjets());
    }

    // Get all projects (approved + pending) for backoffice
    @GetMapping("/all")
    public ResponseEntity<List<Projet>> getAllProjects() {
        return ResponseEntity.ok(projetService.getAllProjets());
    }

    // Get only pending projects for admin approval
    @GetMapping("/pending")
    public ResponseEntity<List<Projet>> getPendingProjects() {
        return ResponseEntity.ok(projetService.getPendingProjets());
    }

    // Get archived projects
    @GetMapping("/archived")
    public ResponseEntity<List<Projet>> getArchivedProjects() {
        return ResponseEntity.ok(projetService.getArchivedProjets());
    }

    // Get a project by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Projet>> getProjetById(@PathVariable Long id) {
        return ResponseEntity.ok(projetService.getProjetById(id));
    }

    // Approve a project (Admin Only)
    @PutMapping("/{id}/approve")
    public ResponseEntity<Projet> approveProjet(@PathVariable Long id) {
        return ResponseEntity.ok(projetService.approveProjet(id));
    }

    // Update a project
    @PutMapping("/{id}")
    public ResponseEntity<Projet> updateProjet(@PathVariable Long id, @RequestBody Projet updatedProjet) {
        return ResponseEntity.ok(projetService.updateProjet(id, updatedProjet));
    }

    // Archive a project
    @PutMapping("/{id}/archive")
    public ResponseEntity<Projet> archiveProjet(@PathVariable Long id) {
        return ResponseEntity.ok(projetService.archiveProjet(id));
    }

    // Unarchive a project
    @PutMapping("/{id}/unarchive")
    public ResponseEntity<Projet> unarchiveProjet(@PathVariable Long id) {
        return ResponseEntity.ok(projetService.unarchiveProjet(id));
    }

    // Delete a project
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
        projetService.deleteProjet(id);
        return ResponseEntity.noContent().build();
    }
}