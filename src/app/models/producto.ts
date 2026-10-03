export type EstadoStock = 'OK' | 'INSUFICIENTE';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  estadoStock: EstadoStock;
  categoria: string; // Actividad Autonoma A1
}
