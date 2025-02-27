package esprit.gestionprojetpi.Services;

import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Repositories.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetService {

    @Autowired
    private ProjetRepository projetRepository;

    // Create or update a project
    public Projet saveProjet(Projet projet) {
        return projetRepository.save(projet);
    }

    // Get only archived projects
    public List<Projet> getArchivedProjets() {
        return projetRepository.findByArchivedTrue();
    }

    // Get a project by ID
    public Optional<Projet> getProjetById(Long id) {
        return projetRepository.findById(id);
    }

    // Delete a project by ID
    public void deleteProjet(Long id) {
        projetRepository.deleteById(id);
    }

    // Archive a project instead of deleting
    public Projet archiveProjet(Long id) {
        Projet projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        projet.setArchived(true);
        return projetRepository.save(projet);
    }

    // Unarchive a project
    public Projet unarchiveProjet(Long id) {
        Projet projet = projetRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        projet.setArchived(false);
        return projetRepository.save(projet);
    }

    // Update project details
    public Projet updateProjet(Long id, Projet updatedProjet) {
        Projet projet = projetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Update fields
        projet.setNom(updatedProjet.getNom());
        projet.setDescription(updatedProjet.getDescription());
        projet.setDateDebut(updatedProjet.getDateDebut());
        projet.setDateFinPrevue(updatedProjet.getDateFinPrevue());
        projet.setBudget(updatedProjet.getBudget());
        projet.setEtat(updatedProjet.getEtat());
        projet.setResponsable(updatedProjet.getResponsable());

        return projetRepository.save(projet);
    }

    // Get unapproved projects for admin approval panel
    public List<Projet> getPendingProjets() {
        return projetRepository.findByApprovedFalse();
    }

    // Approve a project
    public Projet approveProjet(Long id) {
        Projet projet = projetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        projet.setApproved(true);
        return projetRepository.save(projet);
    }

    // Get only approved projects for frontend
    public List<Projet> getApprovedProjets() {
        return projetRepository.findByArchivedFalseAndApprovedTrue();
    }

    // Get all projects (both approved and pending) for backoffice
    public List<Projet> getAllProjets() {
        return projetRepository.findByArchivedFalse();
    }
}
