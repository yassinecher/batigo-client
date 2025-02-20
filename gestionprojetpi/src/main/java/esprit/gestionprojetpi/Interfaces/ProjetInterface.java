package esprit.gestionprojetpi.Interfaces;

import esprit.gestionprojetpi.Entities.Projet;

import java.util.List;
import java.util.Optional;

public interface ProjetInterface {
    Projet creerProjet(Projet projet);
    List<Projet> listerProjets();
    Optional<Projet> obtenirProjetParId(Long id);
    Projet mettreAJourProjet(Long id, Projet projet);
    void supprimerProjet(Long id);
}
