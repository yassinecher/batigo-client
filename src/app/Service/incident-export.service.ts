import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncidentExportService {
  private exportUrl = 'localhost:9090/incidents/export/excel';


  constructor(private http: HttpClient) {}

  downloadExcelFile(): void {
    this.http.get(this.exportUrl, { responseType: 'blob' }).subscribe(blob => {
      const fileURL = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = 'incidents.xlsx';
      a.click();
      URL.revokeObjectURL(fileURL);
    });
  }
}
