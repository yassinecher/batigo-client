package esprit.gestionprojetpi.Services;

import esprit.gestionprojetpi.Entities.Projet;
import esprit.gestionprojetpi.Interfaces.ProjetInterface;
import esprit.gestionprojetpi.Repositories.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetService implements ProjetInterface {
    @Autowired
    private ProjetRepository projetRepository;

    @Override
    public Projet creerProjet(Projet projet) {
        return projetRepository.save(projet);
    }

    @Override
    public List<Projet> listerProjets() {
        return projetRepository.findAll();
    }

    @Override
    public Optional<Projet> obtenirProjetParId(Long id) {
        return projetRepository.findById(id);
    }

    @Override
    public Projet mettreAJourProjet(Long id, Projet projet) {
        projet.setId(id);
        return projetRepository.save(projet);
    }

    @Override
    public void supprimerProjet(Long id) {
        projetRepository.deleteById(id);
    }
}