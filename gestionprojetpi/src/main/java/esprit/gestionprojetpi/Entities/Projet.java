package esprit.gestionprojetpi.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter

public class Projet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFinPrevue;
    private LocalDate dateFinReelle; // ✅ User can enter real-time finish date
    private BigDecimal budget;
    private LocalDateTime lastUpdated; // ✅ Track the last time progress was updated

    @Transient
    private String scheduleStatus; // ✅ Used for real-time schedule analysis
    @Enumerated(EnumType.STRING)
    private Etat etat;

    private String responsable;
    private boolean archived = false;
    private boolean approved = false;

    private int progress = 0; // ✅ Automatically calculated based on budget & duration

    private int expectedProgress = 0;
    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Livrable> livrables = new ArrayList<>();

    public Projet() {
    }

    public Projet(String nom, String description, LocalDate dateDebut, LocalDate dateFinPrevue, LocalDate dateFinReelle, BigDecimal budget, LocalDateTime lastUpdated, String scheduleStatus, Etat etat, String responsable, boolean archived, boolean approved, int progress, int expectedProgress, List<Livrable> livrables) {
        this.nom = nom;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFinPrevue = dateFinPrevue;
        this.dateFinReelle = dateFinReelle;
        this.budget = budget;
        this.lastUpdated = lastUpdated;
        this.scheduleStatus = scheduleStatus;
        this.etat = etat;
        this.responsable = responsable;
        this.archived = archived;
        this.approved = approved;
        this.progress = progress;
        this.expectedProgress = expectedProgress;
        this.livrables = livrables;
    }

    public Projet(Long id, String nom, String description, LocalDate dateDebut, LocalDate dateFinPrevue, LocalDate dateFinReelle, BigDecimal budget, LocalDateTime lastUpdated, String scheduleStatus, Etat etat, String responsable, boolean archived, boolean approved, int progress, int expectedProgress, List<Livrable> livrables) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFinPrevue = dateFinPrevue;
        this.dateFinReelle = dateFinReelle;
        this.budget = budget;
        this.lastUpdated = lastUpdated;
        this.scheduleStatus = scheduleStatus;
        this.etat = etat;
        this.responsable = responsable;
        this.archived = archived;
        this.approved = approved;
        this.progress = progress;
        this.expectedProgress = expectedProgress;
        this.livrables = livrables;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFinPrevue() {
        return dateFinPrevue;
    }

    public void setDateFinPrevue(LocalDate dateFinPrevue) {
        this.dateFinPrevue = dateFinPrevue;
    }

    public LocalDate getDateFinReelle() {
        return dateFinReelle;
    }

    public void setDateFinReelle(LocalDate dateFinReelle) {
        this.dateFinReelle = dateFinReelle;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getScheduleStatus() {
        return scheduleStatus;
    }

    public void setScheduleStatus(String scheduleStatus) {
        this.scheduleStatus = scheduleStatus;
    }

    public Etat getEtat() {
        return etat;
    }

    public void setEtat(Etat etat) {
        this.etat = etat;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public int getExpectedProgress() {
        return expectedProgress;
    }

    public void setExpectedProgress(int expectedProgress) {
        this.expectedProgress = expectedProgress;
    }

    public List<Livrable> getLivrables() {
        return livrables;
    }



    public void setLivrables(List<Livrable> livrables) {
        this.livrables = livrables;
    }
}
