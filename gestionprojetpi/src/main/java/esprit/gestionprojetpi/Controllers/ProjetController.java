package esprit.gestionprojetpi.Controllers;

import esprit.gestionprojetpi.Entities.Etat;
import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Services.PdfService;
import esprit.gestionprojetpi.Services.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
@Autowired
    private PdfService pdfService;
    // Create or update a project
    @PostMapping
    public ResponseEntity<Projet> saveProjet(@RequestBody Projet projet) {
        return ResponseEntity.ok(projetService.saveProjet(projet));
    }

    // Get all approved projects for front office
    @GetMapping
    public ResponseEntity<List<Projet>> getApprovedProjects() {
        List<Projet> projets = projetService.getApprovedProjets();
        if (projets.isEmpty()) {
            System.out.println("No approved projects found!");
        }
        return ResponseEntity.ok(projets);
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
    // Generate PDF for a project
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generateProjectPdf(@PathVariable Long id) {
        try {
            byte[] pdfBytes = pdfService.generateProjectPdf(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "project_report.pdf");
            return ResponseEntity.ok().headers(headers).body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<List<Projet>> searchProjetByName(@PathVariable String name) {
        List<Projet> projets = projetService.searchProjetByName(name);
        return ResponseEntity.ok(projets);
    }


    @GetMapping("/etat/{etat}")
    public ResponseEntity<List<Projet>> getProjetsByEtat(@PathVariable Etat etat) {
        List<Projet> projets = projetService.getProjetsByEtat(etat);
        if (!projets.isEmpty()) {
            return ResponseEntity.ok(projets);
        } else {
            return ResponseEntity.notFound().build();
        }
    }





    @PutMapping("/{id}/progress/{progress}")
    public ResponseEntity<Projet> updateProjetProgress(@PathVariable Long id, @PathVariable int progress) {
        return ResponseEntity.ok(projetService.updateProjetProgress(id, progress));
    }

}