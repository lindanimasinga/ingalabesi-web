import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private router: Router) {}

  orderNow(): void {
    this.router.navigate(['/home']);
  }

  openProfile(): void {
    this.router.navigate(['/home/orders']);
  }

  bookEvent(): void {
    window.open(
      'https://wa.me/27617002915?text=Hi%2C%20I%27d%20like%20to%20book%20an%20event',
      '_blank',
      'noopener'
    );
  }
}
