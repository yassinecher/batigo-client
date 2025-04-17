import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projet } from 'src/app/models/Projet';
import { ServiceFinance } from 'src/service/ServiceFinance';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-projet',
  templateUrl: './show-projet.component.html',
  styleUrls: ['./show-projet.component.scss']
})
export class ShowProjetComponent implements OnInit{

 projetId: number;
  projet: Projet;

  constructor(
    
    private serviceFinance: ServiceFinance,
    private route: ActivatedRoute,
    private location: Location,
     
  ) {}
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
   
    this.projetId = +this.route.snapshot.paramMap.get('id')!;
    
      

    // Fetch the account data from the service
    this.serviceFinance.getProjetById(this.projetId).subscribe({
      next: (data: Projet) => {
        this.projet = data;
       },
      error: (err) => console.error('Error fetching projet data:', err)
    });
  }

  
}
