import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar';
import { ThemeService } from '../../services/theme.service';

describe('Navbar', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            baseTheme: () => 'light',
            isColorblind: () => false,
            toggleBaseTheme: () => {},
            toggleColorblind: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Lucide icons used in the navbar', () => {
    component.isThemeMenuOpen.set(true);
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll(
      'svg[lucidePalette], svg[lucideLanguages], svg[lucideMoon], svg[lucideSun], svg[lucideEye]',
    );

    expect(icons).toHaveLength(4);
  });
});
