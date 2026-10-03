import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto';
import { PRODUCTOS_MOCK } from '../data/productos-mock';

describe('ProductoService (Project 3 - Lab 07B)', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe cargar los productos del mock inicialmente', () => {
    expect(service.productos().length).toBe(PRODUCTOS_MOCK.length);
  });

  it('debe calcular la cantidad total con totalProductos (Actividad A3)', () => {
    expect(service.totalProductos()).toBe(PRODUCTOS_MOCK.length);
  });

  it('debe filtrar reactivamente productosStockBajo con stock < 5 (Actividad A4)', () => {
    const listaBajos = service.productosStockBajo();
    expect(listaBajos.length).toBeGreaterThan(0);
    const todosMenores = listaBajos.every(p => p.stock < 5);
    expect(todosMenores).toBe(true);
  });

  it('debe agregar un nuevo producto y asignar id y estadoStock correctamente', () => {
    const inicial = service.productos().length;

    service.agregar({
      nombre: 'Memoria USB 64GB',
      categoria: 'Almacenamiento',
      precio: 39.90,
      stock: 2, // < 5 -> INSUFICIENTE
    });

    expect(service.productos().length).toBe(inicial + 1);
    const agregado = service.productos()[service.productos().length - 1];
    expect(agregado.nombre).toBe('Memoria USB 64GB');
    expect(agregado.estadoStock).toBe('INSUFICIENTE');
    expect(agregado.categoria).toBe('Almacenamiento');
  });

  it('debe eliminar un producto por su id y actualizar el estado compartido (Actividad A2)', () => {
    const primerId = service.productos()[0].id;
    const inicial = service.productos().length;

    service.eliminar(primerId);

    expect(service.productos().length).toBe(inicial - 1);
    expect(service.productos().some(p => p.id === primerId)).toBe(false);
  });

  it('debe actualizar los datos de un producto existente (RETO)', () => {
    const primerProducto = service.productos()[0];

    service.actualizar(primerProducto.id, {
      precio: 299.99,
      stock: 1, // < 5 -> estadoStock pasa a INSUFICIENTE
    });

    const actualizado = service.obtenerPorId(primerProducto.id);
    expect(actualizado?.precio).toBe(299.99);
    expect(actualizado?.stock).toBe(1);
    expect(actualizado?.estadoStock).toBe('INSUFICIENTE');
  });
});
