import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechOrbit } from './tech-orbit';

describe('TechOrbit', () => {
  let component: TechOrbit;
  let fixture: ComponentFixture<TechOrbit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechOrbit],
    }).compileComponents();

    fixture = TestBed.createComponent(TechOrbit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the default technology buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');

    expect(buttons.length).toBe(12);
    expect(buttons[0].getAttribute('aria-label')).toBe('Angular');
    expect(
      fixture.nativeElement.querySelectorAll('.satellite-button span svg').length,
    ).toBe(12);
  });

  it('should show both guide texts in the central sphere tooltip', () => {
    fixture.componentRef.setInput('guide', 'Experience level');
    fixture.componentRef.setInput('guide2', 'Experience level | Technology | Specialization Area');
    fixture.detectChanges();

    const tooltip = fixture.nativeElement.querySelector('#tech-orbit-guide-tooltip');

    expect(tooltip.textContent).toContain('Experience level');
    expect(tooltip.textContent).toContain('Technology | Specialization Area');
    expect(tooltip.getAttribute('role')).toBe('tooltip');
  });

  it('should keep a clicked technology selected until it is clicked again', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.textContent).toContain('Angular seleccionado');
    expect(fixture.nativeElement.querySelector('.orbit-stage').classList).toContain(
      'is-paused',
    );

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-pressed')).toBe('false');
  });
});
