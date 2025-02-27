package esprit.gestionprojetpi.Repositories;

import esprit.gestionprojetpi.Entities.Livrable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivrableRepository extends JpaRepository<Livrable, Long> {
    List<Livrable> findByProjetId(Long projetId);
}


