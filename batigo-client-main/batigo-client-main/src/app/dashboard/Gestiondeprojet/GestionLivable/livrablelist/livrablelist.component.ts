import { Component, OnInit } from '@angular/core';
import { LivrableService } from 'src/app/Service/Livrable/livrable.service';
import { Livrable } from 'src/app/Model/Livrable';

@Component({
  selector: 'app-livrablelist',
  templateUrl: './livrablelist.component.html',
  styleUrls: ['./livrablelist.component.scss']
})
export class LivrablelistComponent implements OnInit {
  livrables: Livrable[] = [];

  constructor(private livrableService: LivrableService) {}

  ngOnInit(): void {
    this.loadLivrables();
  }

  loadLivrables(): void {
    this.livrableService.listerLivrables().subscribe(
      (data: Livrable[]) => {
        this.livrables = data;
      },
      error => {
        console.error('Error loading deliverables', error);
      }
    );
  }

  editLivrable(id: number): void {
    // Navigate to the edit deliverable form
    // Implement navigation logic here
  }

  deleteLivrable(id: number): void {
    this.livrableService.supprimerLivrable(id).subscribe(
      () => {
        this.livrables = this.livrables.filter(livrable => livrable.id !== id);
      },
      error => {
        console.error('Error deleting deliverable', error);
      }
    );
  }
}