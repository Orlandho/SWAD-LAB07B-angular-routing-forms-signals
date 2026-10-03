import { Producto } from '../models/producto';

export const PRODUCTOS_MOCK: Producto[] = [
  { id: 1, nombre: 'Teclado mecánico RGB', precio: 189.90, stock: 15, estadoStock: 'OK', categoria: 'Periféricos' },
  { id: 2, nombre: 'Mouse inalámbrico ergonómico', precio: 89.50, stock: 3, estadoStock: 'INSUFICIENTE', categoria: 'Periféricos' },
  { id: 3, nombre: 'Monitor 27" IPS 144Hz', precio: 899.00, stock: 8, estadoStock: 'OK', categoria: 'Monitores' },
  { id: 4, nombre: 'Auriculares con cancelación de ruido', precio: 249.00, stock: 2, estadoStock: 'INSUFICIENTE', categoria: 'Audio' },
  { id: 5, nombre: 'Pad mouse XXL', precio: 45.00, stock: 25, estadoStock: 'OK', categoria: 'Accesorios' },
  { id: 6, nombre: 'Soporte de monitor articulado', precio: 129.90, stock: 0, estadoStock: 'INSUFICIENTE', categoria: 'Accesorios' },
];
