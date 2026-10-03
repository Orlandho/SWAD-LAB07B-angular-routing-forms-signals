import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';
import { NuevoProducto } from './pages/nuevo-producto/nuevo-producto';
import { StockBajo } from './pages/stock-bajo/stock-bajo';
import { EditarProducto } from './pages/editar-producto/editar-producto';

export const routes: Routes = [
  { path: '', component: Catalogo },
  { path: 'nuevo', component: NuevoProducto },
  { path: 'stock-bajo', component: StockBajo },
  { path: 'editar/:id', component: EditarProducto },
  { path: '**', redirectTo: '' },
];
