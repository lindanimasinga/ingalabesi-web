import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('orderNow should navigate to /home', () => {
    const spy = spyOn(router, 'navigate');
    component.orderNow();
    expect(spy).toHaveBeenCalledWith(['/home']);
  });

  it('bookEvent should open WhatsApp link in new tab', () => {
    const spy = spyOn(window, 'open');
    component.bookEvent();
    expect(spy).toHaveBeenCalledWith(
      jasmine.stringMatching('wa.me/27617002915'),
      '_blank',
      'noopener'
    );
  });
});
