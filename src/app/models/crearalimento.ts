import { InformacionNutricional } from '../models/informacionnutricional';

export interface CrearAlimento {
  _id: string;
  nombre: string;
  informacion_nutricional: InformacionNutricional;
}