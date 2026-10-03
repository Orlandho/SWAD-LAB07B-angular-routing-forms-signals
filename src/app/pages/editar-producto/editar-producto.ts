import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.scss',
})
export class EditarProducto implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productoService = inject(ProductoService);

  productoOriginal: Producto | null = null;
  id: number | null = null;
  nombre = '';
  categoria = '';
  precio: number | null = null;
  stock: number | null = null;
  mensaje = '';
  noEncontrado = false;

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (!paramId) {
      this.noEncontrado = true;
      return;
    }

    this.id = Number(paramId);
    const prod = this.productoService.obtenerPorId(this.id);
    if (!prod) {
      this.noEncontrado = true;
      return;
    }

    this.productoOriginal = prod;
    this.nombre = prod.nombre;
    this.categoria = prod.categoria;
    this.precio = prod.precio;
    this.stock = prod.stock;
  }

  guardar(): void {
    if (this.id === null) return;
    if (this.precio === null || this.precio <= 0) {
      this.mensaje = 'El precio debe ser mayor que 0.';
      return;
    }
    if (this.stock === null || this.stock < 0) {
      this.mensaje = 'El stock no puede ser negativo.';
      return;
    }

    this.productoService.actualizar(this.id, {
      precio: this.precio,
      stock: this.stock,
    });

    this.router.navigate(['/']);
  }
}
