export interface ConsumoAlimento {
    alimento_id: string; // Reemplaza con el tipo de dato adecuado para el ID del alimento
    cantidad_gramos: number;
  }
  
  export interface Consumo {
    usuario_id: string; // Reemplaza con el tipo de dato adecuado para el ID del usuario
    fecha: Date;
    consumo_alimentos: ConsumoAlimento[];
  }