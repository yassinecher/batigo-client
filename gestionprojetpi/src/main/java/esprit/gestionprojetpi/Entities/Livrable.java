package esprit.gestionprojetpi.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Livrable {
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    private String nom;
    private String type;
    private String statut;
    private LocalDate dateRemisePrevue;
    private LocalDate dateRemiseReelle;
    private String commentaire;

    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;
}
