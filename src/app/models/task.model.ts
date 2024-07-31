import { Duracion } from '../enums/duracion.enum';
import { EstadoActividad } from '../enums/estado.enum';
import { Prioridad } from '../enums/prioridad.enum';
import { SubTask } from './subTask.model';

export interface Task {
  titulo: string;
  tipo: string;
  fase: string;
  descripcion: string;
  objetivos: string;
  prioridad: Prioridad;
  responsable: string;
  duracion: number;
  tipoDuracion: Duracion;
  realizaEvaluacion: boolean;
  status: string;
  subtasks: SubTask[];
  estado: EstadoActividad;
}
