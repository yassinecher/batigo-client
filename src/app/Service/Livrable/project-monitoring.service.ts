import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { LivrableService } from './livrable.service';
import { Livrable } from 'src/app/Model/livrable.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectMonitoringService {
  private pollSubscription: Subscription | undefined;
  // Threshold percentage for flagging a project (e.g., >50% delayed delivered tasks)
  private readonly thresholdPercentage: number = 50;
  // Poll interval in milliseconds; adjust as needed (5 minutes)
  private readonly pollInterval: number = 300000;

  constructor(private livrableService: LivrableService) {}

  // Start polling and execute callback with the array of flagged projects
  startMonitoring(callback: (atRiskProjects: any[]) => void): void {
    // Run immediately at startup
    this.checkProjects(callback);
    // Then poll periodically
    this.pollSubscription = interval(this.pollInterval).subscribe(() => {
      this.checkProjects(callback);
    });
  }

  stopMonitoring(): void {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }
  }

  private checkProjects(callback: (atRiskProjects: any[]) => void): void {
    this.livrableService.getLivrables().subscribe((livrables: Livrable[]) => {
      const projectsMap: { [key: string]: { project: any; livrables: Livrable[] } } = {};
      livrables.forEach(l => {
        if (l.projet && l.projet.id) {
          const projId = l.projet.id;
          if (!projectsMap[projId]) {
            projectsMap[projId] = { project: l.projet, livrables: [] };
          }
          projectsMap[projId].livrables.push(l);
        }
      });

      const atRiskProjects: any[] = [];
      for (const projectId in projectsMap) {
        const projData = projectsMap[projectId];
        const delivered = projData.livrables.filter(l => !!l.dateRemiseReelle);
        if (delivered.length > 0) {
          // Count livrables where actual date is after the expected date
          const delayed = delivered.filter(l => new Date(l.dateRemiseReelle!) > new Date(l.dateRemisePrevue));
          const percentageDelayed = (delayed.length / delivered.length) * 100;
          if (percentageDelayed > this.thresholdPercentage) {
            atRiskProjects.push({
              project: projData.project,
              percentageDelayed: percentageDelayed,
              totalLivrables: projData.livrables.length,
              deliveredCount: delivered.length
            });
          }
        }
      }
      callback(atRiskProjects);
    });
  }
}
