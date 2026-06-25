import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private router: Router, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setHomePageSEO();
  }

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
