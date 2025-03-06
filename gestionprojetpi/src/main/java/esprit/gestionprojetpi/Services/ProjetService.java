package esprit.gestionprojetpi.Services;

import esprit.gestionprojetpi.Entities.Etat;
import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Repositories.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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



    // Get all projects (both approved and pending) for backoffice
    public List<Projet> getAllProjets() {
        return projetRepository.findByArchivedFalse();
    }


    //get project by name
// Search projects by name (partial match)
    public List<Projet> searchProjetByName(String name) {
        return projetRepository.findByNomContainingIgnoreCase(name);
    }



    public List<Projet> getProjetsByEtat(Etat etat) {
        return projetRepository.findByEtat(etat);
    }


    public List<Projet> getApprovedProjets() {
        List<Projet> projets = projetRepository.findByArchivedFalseAndApprovedTrue();
        projets.forEach(this::analyzeProjectSchedule); // ✅ Analyze each project
        return projets;
    }


    public Projet updateProjetProgress(Long id, int progress) {
        Projet projet = projetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projet.setProgress(progress);
        projet.setLastUpdated(LocalDateTime.now());

        // ✅ Analyze schedule status after updating progress
        analyzeProjectSchedule(projet);

        // ✅ If progress reaches 100%, mark project as complete and archive it
        if (progress == 100) {
            projet.setEtat(Etat.TERMINE);
            projet.setArchived(true);
        }

        return projetRepository.save(projet);
    }

    private void analyzeProjectSchedule(Projet projet) {
        LocalDate today = LocalDate.now();
        LocalDate startDate = projet.getDateDebut();
        LocalDate endDate = projet.getDateFinPrevue();

        long totalDuration = ChronoUnit.DAYS.between(startDate, endDate);
        long daysPassed = ChronoUnit.DAYS.between(startDate, today);

        // ✅ Avoid division by zero
        if (totalDuration <= 0 || daysPassed < 0) {
            projet.setScheduleStatus("Invalid Dates");
            return;
        }

        int expectedProgress = (int) ((daysPassed / (double) totalDuration) * 100);
        int actualProgress = projet.getProgress();

        if (actualProgress < expectedProgress - 5) {
            projet.setScheduleStatus("Behind Schedule ❌");
        } else if (actualProgress > expectedProgress + 5) {
            projet.setScheduleStatus("Ahead of Schedule ✅");
        } else {
            projet.setScheduleStatus("On Track ⚠️");
        }
    }




}
