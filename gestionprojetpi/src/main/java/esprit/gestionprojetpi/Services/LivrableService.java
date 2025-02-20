package esprit.gestionprojetpi.Services;

import esprit.gestionprojetpi.Entities.Livrable;
import esprit.gestionprojetpi.Interfaces.LivrableInterface;
import esprit.gestionprojetpi.Repositories.LivrableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivrableService implements LivrableInterface {
    @Autowired
    private LivrableRepository livrableRepository;

    @Override
    public Livrable creerLivrable(Livrable livrable) {
        return livrableRepository.save(livrable);
    }

    @Override
    public List<Livrable> listerLivrables() {
        return livrableRepository.findAll();
    }

    @Override
    public Optional<Livrable> obtenirLivrableParId(Long id) {
        return livrableRepository.findById(id);
    }



    @Override
    public void supprimerLivrable(Long id) {
        livrableRepository.deleteById(id);
    }
}
