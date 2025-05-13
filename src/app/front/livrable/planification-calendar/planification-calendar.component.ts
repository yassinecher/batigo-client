import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventDropArg, EventClickArg, EventContentArg, DayCellMountArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import { Router } from '@angular/router';
import { LivrableService } from 'src/app/Service/livrable.service';
import { Livrable } from 'src/app/back/model/livrable.model';
@Component({
  selector: 'app-planification-calendar',
  templateUrl: './planification-calendar.component.html',
  styleUrls: ['./planification-calendar.component.scss']
})
export class PlanificationCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin],
    themeSystem: 'bootstrap5',
    initialView: 'dayGridMonth',
    editable: true, 
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    // Custom event content callback to include gradient background, icons, etc.
    eventContent: this.renderEventContent.bind(this),
    eventDidMount: (info) => {
      // Set tooltip based on 'commentaire'
      const comment = info.event.extendedProps['commentaire'];
      if (comment) {
        info.el.setAttribute('title', comment);
      }
    },
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    // Your events array (populated below)
    events: []
  };

  constructor(private livrableService: LivrableService, private router: Router) { }

  ngOnInit(): void {
    this.loadLivrableEvents();
  }

  loadLivrableEvents(): void {
    this.livrableService.getLivrables().subscribe((livrables: Livrable[]) => {
      const events = livrables.map(livrable => {
        let isDueSoon = false;
        if (!livrable.dateRemiseReelle && livrable.dateRemisePrevue) {
          const expectedDate = new Date(livrable.dateRemisePrevue);
          const today = new Date();
          const timeDiff = expectedDate.getTime() - today.getTime();
          const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          if (dayDiff <= 3 && dayDiff >= 0) {
            isDueSoon = true;
          }
        }
        // Prepend an icon if due soon (using Font Awesome's exclamation-triangle, for example)
        const priorityIcon = isDueSoon ? '<i class="fas fa-exclamation-triangle" style="color:#ff0000;"></i> ' : '';
        // You can adjust the base title without the icon.
        const title = priorityIcon + livrable.nom;
        return {
          id: livrable.id.toString(),
          title: title,
          start: livrable.dateRemisePrevue,
          // Color can be dynamic; here, we use red for overdue and a gradient for urgent events.
          color: livrable.overdue ? 'red' : (isDueSoon ? '#ffcccc' : 'green'),
          extendedProps: {
            livrable: livrable,
            commentaire: livrable.commentaire,
            actualEndDate: livrable.dateRemiseReelle
          }
        };
      });
      this.calendarOptions.events = events;
    });
  }

  renderEventContent(arg: EventContentArg) {
    // Check if event title begins with the priority icon.
    const title = arg.event.title;
    // Extract the raw title for display (in case the icon is embedded).
    const displayTitle = title.replace(/<[^>]*>/g, ""); // Remove HTML tags if needed.
    // Build the custom HTML content. You can include icons, badges, progress bars, etc.
    return {
      html: `
        <div style="line-height:1.2; padding: 5px; border-radius: 5px; 
                    ${arg.event.extendedProps['commentaire'] ? 'background: linear-gradient(to right, #ffcccc, #ffe6e6);' : ''}">
          <div><strong>${title}</strong></div>
          <div class="small text-secondary">${arg.event.extendedProps['commentaire'] || ''}</div>
          <div class="small text-muted">Ends: ${arg.event.extendedProps['actualEndDate'] || 'N/A'}</div>
        </div>
      `
    };
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const livrable: Livrable = clickInfo.event.extendedProps['livrable'];
    console.log('Event clicked:', livrable);
    // Optionally, open a modal or navigate to a detailed view.
  }

  handleEventDrop(dropInfo: EventDropArg): void {
    const newDate = dropInfo.event.start;
    let livrable: Livrable = dropInfo.event.extendedProps['livrable'];
    if (livrable.dateRemiseReelle) {
      const actualDate = new Date(livrable.dateRemiseReelle);
      if (newDate && newDate > actualDate) {
        alert("Cannot move the expected delivery date beyond the actual delivery date.");
        dropInfo.revert();
        return;
      }
    }
    if (newDate) {
      const localDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
      livrable.dateRemisePrevue = localDate.toISOString().split('T')[0];
    }
    this.livrableService.updateLivrable(livrable).subscribe({
      next: (updatedLivrable) => {
        console.log('Livrable updated successfully', updatedLivrable);
        dropInfo.event.setExtendedProp('livrable', updatedLivrable);
      },
      error: (err) => {
        console.error('Error updating livrable', err);
        dropInfo.revert();
      }
    });
  }
}
