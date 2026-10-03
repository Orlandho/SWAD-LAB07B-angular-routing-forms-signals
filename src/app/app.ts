import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductoService } from './services/producto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly productoService = inject(ProductoService);

  // Actividad Autonoma A3: lectura directa del signal del servicio para la cantidad total
  readonly totalProductos = this.productoService.totalProductos;
  readonly totalStockBajo = this.productoService.productosStockBajo;
}
