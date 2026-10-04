import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { EditarProducto } from './editar-producto';
import { ProductoService } from '../../services/producto';

describe('EditarProducto Component (Project 3 - Lab 07B Reto)', () => {
  let component: EditarProducto;
  let fixture: ComponentFixture<EditarProducto>;
  let productoService: ProductoService;
  let router: Router;

  const setupModule = async (paramId: string | null) => {
    await TestBed.configureTestingModule({
      imports: [EditarProducto],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(paramId ? { id: paramId } : {}),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarProducto);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    router = TestBed.inject(Router);
  };

  describe('Con producto existente', () => {
    beforeEach(async () => {
      await setupModule('1');
      fixture.detectChanges();
    });

    it('debe crearse y cargar datos del producto a editar', () => {
      expect(component).toBeTruthy();
      expect(component.noEncontrado).toBe(false);
      expect(component.id).toBe(1);
      expect(component.nombre).toBeTruthy();
      expect(component.precio).toBeGreaterThan(0);
    });

    it('debe validar que el precio no sea 0 ni negativo', () => {
      component.precio = 0;
      component.guardar();
      expect(component.mensaje).toBe('El precio debe ser mayor que 0.');

      component.precio = -10;
      component.guardar();
      expect(component.mensaje).toBe('El precio debe ser mayor que 0.');
    });

    it('debe validar que el stock no sea negativo', () => {
      component.stock = -5;
      component.guardar();
      expect(component.mensaje).toBe('El stock no puede ser negativo.');
    });

    it('debe actualizar los datos en el servicio y navegar a la ruta raiz', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');
      component.precio = 299.99;
      component.stock = 20;

      component.guardar();

      const actualizado = productoService.obtenerPorId(1);
      expect(actualizado?.precio).toBe(299.99);
      expect(actualizado?.stock).toBe(20);
      expect(actualizado?.estadoStock).toBe('OK');
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  });

  describe('Con producto no existente o parametro nulo', () => {
    it('debe marcar noEncontrado como true cuando el ID no existe en el catalogo', async () => {
      await setupModule('9999');
      fixture.detectChanges();

      expect(component.noEncontrado).toBe(true);
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Producto no encontrado');
    });

    it('debe marcar noEncontrado como true cuando no se envia parametro id', async () => {
      await setupModule(null);
      fixture.detectChanges();

      expect(component.noEncontrado).toBe(true);
    });
  });
});
