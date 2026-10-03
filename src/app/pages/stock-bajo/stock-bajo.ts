import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-stock-bajo',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './stock-bajo.html',
  styleUrl: './stock-bajo.scss',
})
export class StockBajo {
  private readonly productoService = inject(ProductoService);

  // Actividad Autonoma A4: lista de productos con stock < 5 usando computed() desde el servicio
  readonly productos = this.productoService.productosStockBajo;

  eliminar(id: number): void {
    this.productoService.eliminar(id);
  }
}
