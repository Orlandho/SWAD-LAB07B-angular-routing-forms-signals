import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './nuevo-producto.html',
  styleUrl: './nuevo-producto.scss',
})
export class NuevoProducto {
  private readonly productoService = inject(ProductoService);
  private readonly router = inject(Router);

  nombre = '';
  categoria = 'Periféricos';
  precio: number | null = null;
  stock: number | null = null;
  mensaje = '';

  guardar(): void {
    const nombre = this.nombre.trim();
    const categoria = this.categoria.trim();

    if (!nombre) {
      this.mensaje = 'Ingrese el nombre del producto.';
      return;
    }
    if (!categoria) {
      this.mensaje = 'Ingrese o seleccione una categoría válida.';
      return;
    }
    if (this.precio === null || this.precio <= 0) {
      this.mensaje = 'El precio debe ser mayor que 0.';
      return;
    }
    if (this.stock === null || this.stock < 0) {
      this.mensaje = 'El stock no puede ser negativo.';
      return;
    }

    this.productoService.agregar({
      nombre,
      categoria,
      precio: this.precio,
      stock: this.stock,
    });

    this.router.navigate(['/']);
  }
}
