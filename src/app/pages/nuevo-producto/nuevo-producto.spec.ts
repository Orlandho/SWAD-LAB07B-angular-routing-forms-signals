import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NuevoProducto } from './nuevo-producto';
import { ProductoService } from '../../services/producto';

describe('NuevoProducto Component (Project 3 - Lab 07B)', () => {
  let component: NuevoProducto;
  let fixture: ComponentFixture<NuevoProducto>;
  let productoService: ProductoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoProducto],
      providers: [
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoProducto);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe rechazar el guardado si el nombre está vacío', () => {
    component.nombre = '';
    component.precio = 100;
    component.stock = 5;

    component.guardar();

    expect(component.mensaje).toBe('Ingrese el nombre del producto.');
  });

  it('debe rechazar el guardado si el precio es 0 o negativo', () => {
    component.nombre = 'Teclado';
    component.precio = 0;
    component.stock = 5;

    component.guardar();

    expect(component.mensaje).toBe('El precio debe ser mayor que 0.');
  });

  it('debe rechazar el guardado si el stock es negativo', () => {
    component.nombre = 'Teclado';
    component.precio = 50;
    component.stock = -2;

    component.guardar();

    expect(component.mensaje).toBe('El stock no puede ser negativo.');
  });

  it('debe guardar un producto válido en el servicio y limpiar mensaje de error', () => {
    const totalInicial = productoService.totalProductos();

    component.nombre = 'Disco Solido NVMe 1TB';
    component.categoria = 'Almacenamiento';
    component.precio = 320;
    component.stock = 12;

    component.guardar();

    expect(component.mensaje).toBe('');
    expect(productoService.totalProductos()).toBe(totalInicial + 1);
  });
});
