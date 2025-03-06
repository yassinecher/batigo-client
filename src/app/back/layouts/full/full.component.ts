import { CommonModule, I18nPluralPipe } from "@angular/common";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { NavigationComponent } from "../../shared/header/navigation.component";
import { CalendarA11y, CalendarDateFormatter, CalendarEventTitleFormatter, CalendarUtils, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FlatpickrDefaults } from "angularx-flatpickr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: "app-full-layout",
  standalone: true,
  imports:[    
    RouterModule, SidebarComponent, NavigationComponent, CommonModule, NgbCollapseModule ],
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,  // Ensure DateAdapter is provided
    },{
      provide: CalendarDateFormatter,
      useClass: CalendarDateFormatter, // Add this provider
    },  {
      provide: CalendarUtils,
      useClass: CalendarUtils, // Add the CalendarUtils provider here
    },
    {
      provide: CalendarA11y,
      useClass: CalendarA11y, // Add the CalendarUtils provider here
    },
    {
      provide: FlatpickrDefaults ,
      useClass: FlatpickrDefaults , // Add the CalendarUtils provider here
    },
    {
      provide: I18nPluralPipe,
      useClass: I18nPluralPipe , // Add the CalendarUtils provider here
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CalendarEventTitleFormatter, // Add the CalendarUtils provider here
    },
    

  
  ]
})
export class FullComponent implements OnInit {

  constructor(public router: Router) {}
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    if (this.router.url === "/") {
      this.router.navigate(["/dashboard"]);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }
}
