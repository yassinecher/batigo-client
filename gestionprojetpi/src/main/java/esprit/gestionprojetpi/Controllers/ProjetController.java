package esprit.gestionprojetpi.Controllers;

import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Services.ProjetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/projets")
@AllArgsConstructor
@CrossOrigin("*") // Allow all origins (for frontend testing)
public class ProjetController {

    @Autowired
    private ProjetService projetService;

    @Operation(summary = "Create a new project", description = "Saves a new project in the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Projet.class))})
    })
    @PostMapping("/creer")
    public Projet creerProjet(@RequestBody Projet projet) {
        return projetService.creerProjet(projet);
    }

    @Operation(summary = "List all projects", description = "Returns a list of all projects.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of projects",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Projet.class))})
    })
    @GetMapping("/lister")
    public List<Projet> listerProjets() {
        return projetService.listerProjets();
    }

    @Operation(summary = "Get a project by ID", description = "Fetches details of a project by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Projet.class))}),
            @ApiResponse(responseCode = "404", description = "Project not found")
    })
    @GetMapping("/obtenir/{id}")
    public ResponseEntity<Projet> obtenirProjetParId(@PathVariable Long id) {
        return projetService.obtenirProjetParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Update a project", description = "Updates project details by ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project updated",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = Projet.class))}),
            @ApiResponse(responseCode = "404", description = "Project not found")
    })
    @PutMapping("/mettreAJour/{id}")
    public Projet mettreAJourProjet(@PathVariable Long id, @RequestBody Projet projet) {
        return projetService.mettreAJourProjet(id, projet);
    }

    @Operation(summary = "Delete a project", description = "Deletes a project by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Project deleted"),
            @ApiResponse(responseCode = "404", description = "Project not found")
    })
    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimerProjet(@PathVariable Long id) {
        projetService.supprimerProjet(id);
        return ResponseEntity.noContent().build();
    }
}
