import { env } from "../env";



export interface ReportesFiltros {
  departamento_id?: number;
  solicitante_id?: number;
  tecnico_asignado_id?: number;
  categoria_id?: number;
  prioridad_id?: number;
  estado_id?: number;
  calificacion?: string;
  fecha_creacion?: {
    desde?: string; 
    hasta?: string; 
  };
}

export class ReportesAPI {
  static async generarReporte(filtros: ReportesFiltros): Promise<Blob> {
    const response = await fetch(`${env.BACK_URL}/reportes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({
        filtros,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al generar el reporte");
    }

    return await response.blob();
  }
}
