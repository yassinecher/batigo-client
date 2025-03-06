package esprit.gestionprojetpi.Repositories;

import esprit.gestionprojetpi.Entities.Etat;
import esprit.gestionprojetpi.Entities.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjetRepository extends JpaRepository<Projet, Long> {
    List<Projet> findByArchivedFalse(); // Returns only active projects
    List<Projet> findByArchivedTrue();  // Returns only archived projects
    List<Projet> findByArchivedFalseAndApprovedTrue(); // ✅ Show only approved projects
    List<Projet> findByApprovedFalse(); // ✅ Show pending projects (for admin)

    List<Projet> findByEtat(Etat etat);

    List<Projet> findByNomContainingIgnoreCase(String nom);
}

