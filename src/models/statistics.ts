export interface Statistics {
   employee_id: string,
   conocimiento: {
      practico: number;
      teorico: number
   };
   saberHacer: {
      calidad: number;
      productividad: number;
      puntualidad: number;
      orientacion: number;
   };
   saberEstar: {
      adaptabilidad: number;
      calidadTrabajo: number;
      autocontrol: number;
      compromiso: number;
      confianza: number;
      constancia: number;
      cooperacion: number;
      disciplina: number;
      honestidad: number;
      relaciones: number;
      responsabilidad: number;
      tolerancia: number;
   }
}