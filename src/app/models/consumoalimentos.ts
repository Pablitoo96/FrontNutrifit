export interface ConsumoAlimento {
    alimento_id?: string;
    cantidad_gramos: number;
  }
  
  export interface ConsumoAlimentos {
    consumo_alimentos: ConsumoAlimento[]; // Cambiar de 'consumo_alimentos' a 'consumo_alimento'
  }