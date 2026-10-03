import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  private readonly productoService = inject(ProductoService);
  readonly productos = this.productoService.productos;

  // Actividad Autonoma A2: delegacion de eliminacion al servicio
  eliminar(id: number): void {
    this.productoService.eliminar(id);
  }
}
