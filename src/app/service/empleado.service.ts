import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ResponseDto } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  
  baseUrl:string = "http://localhost:8080/api/empleado";
  
  constructor(private http:HttpClient) { }
  getAll(): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.baseUrl + "/obtenerTodosLosEmpleados");
  }

  getAllEstadoVacunacion(estado: boolean): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.baseUrl + "/obtenerEmpleadosEstadoVacunacion?estadoVacunacion=" + estado);
  }

  getAllTipoVacuna(tipo: string): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.baseUrl + "/obtenerEmpleadosTipoVacuna?vacuna=" + tipo);
  }

  getAllFechaVacunacion(fechaInicio: Date, fechaFin: Date): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.baseUrl + "/obtenerEmpleadosRangoFechas?fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin);
  }
}
