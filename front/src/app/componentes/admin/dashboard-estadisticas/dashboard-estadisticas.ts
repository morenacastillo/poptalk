import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';
import { EstadisticasService } from '../../../servicios/estadisticas.service';
import { Dato } from '../../../modelos/estadisticas';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-dashboard-estadisticas',
  styleUrl: './dashboard-estadisticas.css',
  templateUrl: './dashboard-estadisticas.html',
})
export class DashboardEstadisticas implements OnInit{
  formFechas = new FormGroup({
    desde: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    hasta: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  error = signal('');
  vacioPublicaciones = signal(false);
  vacioComentarios = signal(false);
  vacioPorPublicacion = signal(false)

  private graficoPublicaciones?: Chart;
  private graficoComentarios?: Chart;
  private graficoPorPublicacion?: Chart;

  private colores = ['#7CC4EC', '#FFC2D9', '#FFE8A3', '#B6F0CF', '#FFB4B4', '#BFE6FA']

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit() {
    const hoy = new Date()
    const haceUnMes = new Date()
    haceUnMes.setMonth(hoy.getMonth() - 1)

    this.formFechas.setValue({
      desde: haceUnMes.toISOString().substring(0, 10),
      hasta: hoy.toISOString().substring(0, 10),
    });
    this.buscar();
  }

  ngOnDestroy() {
    this.graficoPublicaciones?.destroy();
    this.graficoComentarios?.destroy();
    this.graficoPorPublicacion?.destroy();
  }

  buscar() {
    if(this.formFechas.invalid) {
      return
    }

    this.error.set('')
    const fechas = this.formFechas.getRawValue()

    this.estadisticasService.publicacionesPorUsuario(fechas.desde, fechas.hasta).subscribe({
      next: (datos) => {
        this.vacioPublicaciones.set(datos.length === 0);
        this.graficoPublicaciones = this.dibujar(this.graficoPublicaciones, 'graficoPublicaciones', 'pie', 'Publicaciones', datos);
      },
      error: (err) => this.mostrarError(err)
    });

    this.estadisticasService.comentariosPorDia(fechas.desde, fechas.hasta).subscribe({
      next: (datos) => {
        this.vacioComentarios.set(datos.length === 0);
        this.graficoComentarios = this.dibujar(this.graficoComentarios, 'graficoComentarios', 'line', 'Comentarios', datos);
      },
      error: (err) => this.mostrarError(err)
    });

    this.estadisticasService.comentariosPorPublicacion(fechas.desde, fechas.hasta).subscribe({
      next: (datos) => {
        this.vacioPorPublicacion.set(datos.length === 0);
        this.graficoPorPublicacion = this.dibujar(this.graficoPorPublicacion, 'graficoPorPublicacion', 'bar', 'Comentarios', datos);
      },
      error: (err) => this.mostrarError(err)
    });
  }


  private dibujar(anterior: Chart | undefined, idCanvas: string, tipo: 'pie' | 'line' | 'bar', titulo: string, datos: Dato[]) {
    if (anterior) {
      anterior.destroy();
    }

    const etiquetas: string[] = [];
    const cantidades: number[] = [];
    for (const dato of datos) {
      etiquetas.push(dato.etiqueta);
      cantidades.push(dato.cantidad);
    }

    let opciones: any = { maintainAspectRatio: false };
    if (tipo !== 'pie') {
      // en barras y líneas el eje arranca en 0 y va de a números enteros
      opciones = { maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } };
    }

    return new Chart(idCanvas, {
      type: tipo,
      data: {
        labels: etiquetas,
        datasets: [{
          label: titulo,
          data: cantidades,
          backgroundColor: this.colores,
          borderColor: '#10213F',
          borderWidth: 2,
        }],
      },
      options: opciones,
    });
  }

  
  private mostrarError(err: any) {
    if (err.status === 0) {
      this.error.set('No se pudo conectar con el servidor.');
      return;
    }
    const mensaje = err.error?.message;
    if (Array.isArray(mensaje)) {
      this.error.set(mensaje.join('. '));
      return;
    }
    this.error.set(mensaje ?? 'Ocurrió un error inesperado.');
  }
  
}


