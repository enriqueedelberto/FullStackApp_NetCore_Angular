import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavModel } from '../model/NavModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) { }

  navModel;


  ngOnInit() {
    const user = 'Admin';
    switch (user) {
      case 'Admin':
        this.navModel = [
          new NavModel('/dashboard', 'Home', 'home'),
          new NavModel('/student', 'Students', 'account_circle'),
          new NavModel('/about', 'About', 'help'),
          new NavModel('/settings', 'Settings', 'settings'),
        ];
        break;
      default:
        this.navModel = [
          new NavModel('/dashboard', 'Home', 'home'),
        ];
        break;

    }
  }

  logout(): void {
    // localStorage.removeItem('JWT');
    this.router.navigate(['dashboard']);
  }

  navigateTo(link) {
    this.router.navigate([link]);
  }


}
