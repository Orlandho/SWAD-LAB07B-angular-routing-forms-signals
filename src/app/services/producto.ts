import { Injectable, computed, signal } from '@angular/core';
import { Producto } from '../models/producto';
import { PRODUCTOS_MOCK } from '../data/productos-mock';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly _productos = signal<Producto[]>([...PRODUCTOS_MOCK]);
  readonly productos = this._productos.asReadonly();

  // Actividad Autonoma A3: senal computada para total de productos
  readonly totalProductos = computed(() => this._productos().length);

  // Actividad Autonoma A4: senal computada con productos cuyo stock sea menor que 5
  readonly productosStockBajo = computed(() =>
    this._productos().filter(p => p.stock < 5)
  );

  agregar(datos: Omit<Producto, 'id' | 'estadoStock'>): void {
    const lista = this._productos();
    const nuevo: Producto = {
      id: Math.max(0, ...lista.map(p => p.id)) + 1,
      ...datos,
      estadoStock: datos.stock < 5 ? 'INSUFICIENTE' : 'OK',
    };
    this._productos.update(actual => [...actual, nuevo]);
  }

  // Actividad Autonoma A2: metodo de eliminacion en el servicio
  eliminar(id: number): void {
    this._productos.update(actual => actual.filter(p => p.id !== id));
  }

  // RETO: busqueda por identificador para edicion
  obtenerPorId(id: number): Producto | undefined {
    return this._productos().find(p => p.id === id);
  }

  // RETO: actualizacion reactiva de producto
  actualizar(id: number, cambios: Partial<Omit<Producto, 'id' | 'estadoStock'>>): void {
    this._productos.update(actual =>
      actual.map(p => {
        if (p.id !== id) return p;
        const actualizado = { ...p, ...cambios };
        actualizado.estadoStock = actualizado.stock < 5 ? 'INSUFICIENTE' : 'OK';
        return actualizado;
      })
    );
  }
}
