package esprit.gestionprojetpi.Repositories;

import esprit.gestionprojetpi.Entities.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetRepository extends JpaRepository<Projet, Long> {}

