package esprit.gestionprojetpi.Services;

import esprit.gestionprojetpi.Entities.Livrable;
import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Entities.Statut;
import esprit.gestionprojetpi.Repositories.LivrableRepository;
import esprit.gestionprojetpi.Repositories.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivrableService {

    @Autowired
    private LivrableRepository livrableRepository;
    @Autowired
    private ProjetRepository projetRepository;



    public Livrable createLivrable(Livrable livrable) {
        if (livrable.getProjet() == null || livrable.getProjet().getId() == null) {
            throw new RuntimeException("Livrable must be associated with a project.");
        }

        Projet projet = projetRepository.findById(livrable.getProjet().getId())
                .orElseThrow(() -> new RuntimeException("Project not found with ID: " + livrable.getProjet().getId()));

        livrable.setProjet(projet);
        return livrableRepository.save(livrable);
    }
    public Livrable updateLivrable(Long id, Livrable updatedLivrable) {
        Livrable existingLivrable = livrableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livrable not found with ID: " + id));

        // Preserve the existing project if not provided in the request
        if (updatedLivrable.getProjet() == null || updatedLivrable.getProjet().getId() == null) {
            updatedLivrable.setProjet(existingLivrable.getProjet());
        } else {
            Projet projet = projetRepository.findById(updatedLivrable.getProjet().getId())
                    .orElseThrow(() -> new RuntimeException("Project not found with ID: " + updatedLivrable.getProjet().getId()));
            updatedLivrable.setProjet(projet);
        }

        existingLivrable.setNom(updatedLivrable.getNom());
        existingLivrable.setType(updatedLivrable.getType());
        existingLivrable.setStatut(updatedLivrable.getStatut());
        existingLivrable.setDateRemisePrevue(updatedLivrable.getDateRemisePrevue());
        existingLivrable.setDateRemiseReelle(updatedLivrable.getDateRemiseReelle());
        existingLivrable.setCommentaire(updatedLivrable.getCommentaire());
        existingLivrable.setProjet(updatedLivrable.getProjet()); // ✅ Ensure project is set

        return livrableRepository.save(existingLivrable);
    }


    // Create or update a deliverable
    public Livrable saveLivrable(Livrable livrable) {
        return livrableRepository.save(livrable);
    }

    // Get all deliverables
    public List<Livrable> getAllLivrables() {
        return livrableRepository.findAll();
    }

    // Get a deliverable by ID
    public Optional<Livrable> getLivrableById(Long id) {
        return livrableRepository.findById(id);
    }

    // Get all deliverables for a specific project
    public List<Livrable> getLivrablesByProjetId(Long projetId) {
        return livrableRepository.findByProjetId(projetId);
    }

    // Delete a deliverable by ID
    public void deleteLivrable(Long id) {
        livrableRepository.deleteById(id);
    }


    public Livrable updateLivrableStatus(Long id, String newStatus) {
        Livrable livrable = livrableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livrable not found with ID: " + id));

        try {
            Statut statutEnum = Statut.valueOf(newStatus); // ✅ Convert string to enum
            livrable.setStatut(statutEnum);
            return livrableRepository.save(livrable);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid statut value: " + newStatus);
        }
    }


}
