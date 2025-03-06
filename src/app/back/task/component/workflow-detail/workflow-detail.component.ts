import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskService } from '../../data-access/task.service';
import { WorkflowService } from '../../data-access/workflow.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from '../task-form/task-form.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
const colors: Record<string, EventColor> = {
  TODO:{
    primary: '#f90000',
    secondary: '#ffd7d7',
  },
  IN_PROGRESS:{
    primary: '#ffcd00',
    secondary: '#f2ffba',
  },
  DONE:{
    primary: '#23ff00',
    secondary: '#c3ffb9',
  },
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./workflow-detail.component.scss']
})
export class WorkflowDetailComponent implements OnInit {
  workflowId!: string;
  taskList: Task[] = []
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
  
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,private modalService: NgbModal, private workflowService: WorkflowService, private router: Router, private route: ActivatedRoute, private workflowSertvice: TaskService, private taskService: TaskService) { }

  /** Handle day click */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      this.activeDayIsOpen = events.length > 0 ? !this.activeDayIsOpen : false;
    }
  }
   /** Handle event drag or resize */
   eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.updateTask(event.meta.task)
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  ngOnInit() {
    this.workflowId = this.route.snapshot.paramMap.get('id')!; // Get the ID from the URL
    this.loadTasks()

  }
  loadTasks() {
    this.taskService.getTasksByWorkflow(Number(this.workflowId)).subscribe((tasks) => {
      this.taskList = tasks;
      this.events = tasks.map((task) => ({
        start: parseISO(task.dateStart.toString()),
        end: parseISO(task.dateEnd.toString()), 
        title: task.title,
        color: colors[task.status],
        actions: this.getEventActions(task),
        meta: { task },
        draggable: false,
        resizable: { beforeStart: false, afterEnd: false },
      }));
      this.refresh.next(); // Refresh calendar
    });
  }
  getEventActions(task: Task): CalendarEventAction[] {
    return [
      {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: () => this.updateTask(task),
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: () => this.deleteTask(task.id!),
      },
    ];
  }
  /** Add a new task */
  addTask() {
    const modalRef = this.modalService.open(TaskFormComponent);
    modalRef.componentInstance.workflowId = Number(this.workflowId);
    modalRef.componentInstance.taskUpdated.subscribe(() => {
      this.loadTasks();
      modalRef.close();
    });
   
    modalRef.result.then(() => this.loadTasks());
  }
  /** Update a task */
  updateTask(task: Task) {
    const modalRef = this.modalService.open(UpdateTaskComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.taskUpdated.subscribe(() => {
      this.loadTasks();
      modalRef.close();
    });
    modalRef.result.then(() => this.loadTasks());
  }


  /** Delete a task */
  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }


}
