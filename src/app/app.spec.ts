import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { ProductoService } from './services/producto';

describe('App Component (Project 3 - Lab 07B)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
      ]
    }).compileComponents();
  });

  it('debe crear el componente raiz correctamente', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debe leer el total de productos directamente del signal del servicio (Actividad A3)', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const service = TestBed.inject(ProductoService);
    expect(app.totalProductos()).toBe(service.totalProductos());
  });

  it('debe renderizar la barra de navegación y el router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
