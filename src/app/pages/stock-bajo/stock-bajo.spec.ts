import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StockBajo } from './stock-bajo';
import { ProductoService } from '../../services/producto';

describe('StockBajo Component (Project 3 - Lab 07B A4)', () => {
  let component: StockBajo;
  let fixture: ComponentFixture<StockBajo>;
  let productoService: ProductoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockBajo],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StockBajo);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar unicamente productos cuyo stock sea menor que 5', () => {
    const prods = component.productos();
    expect(prods.length).toBeGreaterThan(0);
    expect(prods.every(p => p.stock < 5)).toBe(true);
  });

  it('debe invocar la eliminacion en el servicio al pulsar eliminar', () => {
    const prodAEliminar = component.productos()[0];
    const totalInicial = component.productos().length;

    component.eliminar(prodAEliminar.id);
    fixture.detectChanges();

    expect(component.productos().length).toBe(totalInicial - 1);
    expect(component.productos().find(p => p.id === prodAEliminar.id)).toBeUndefined();
  });
});
