import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Empleado } from 'src/app/model/empleado.model';
import { EmpleadoBusqueda } from '../model/empleadoBusqueda';
import { ResponseDto } from '../model/response';
import { EmpleadoService } from '../service/empleado.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
//crear listado del Empleado
   
  empleados: Empleado[] = []; 
  empleadosBusquedaList: EmpleadoBusqueda[]=[];
  filtros: any[] = [];  
  estados: EstadoVacuna[] = [];
  tipoVacunas: TipoVacuna[] = [];
  vacunaSeleccionada: TipoVacuna | undefined;
  estadoSeleccionado: EstadoVacuna | undefined;
    
  constructor( private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.filtros = [
      {name: 'Estado de Vacunación', code: 'EV'},
      {name: 'Tipo de Vacuna', code: 'TV'},
      {name: 'Fecha de Vacunación', code: 'FV'},
    ];

    this.estados = [
      {name: 'Vacunado', code: true},
      {name: 'No Vacunado', code: false},
    ];

    this.tipoVacunas = [
      {name: 'Sputnik', code: 'Sputnik'},
      {name: 'AstraZeneca', code: 'AstraZeneca'},
      {name: 'Pfizer', code: 'Pfizer'},
      {name: 'Jhonson', code: 'Jhonson'},
    ];

    this.estadoSeleccionado = this.estados[0];
    this.vacunaSeleccionada = this.tipoVacunas[0];

    this.getAll();
  }
  getAll(){
    this.empleadoService.getAll().subscribe(
      (result: ResponseDto)=>{
        if(result.error === false){
        for (let empleado of result.auto){     
          this.empleados.push(empleado as Empleado);
        }
      }}
    )
  }
  
  hacerBusqueda(event: any){
    const code = event.value.code;
    if(code == 'EV'){
      
      this.getAllEstadoVacuna(this.estadoSeleccionado?.code);

    }else if(code == 'TV'){
      this.getAllTipoVacuna(this.vacunaSeleccionada?.code);

    }else if(code == 'FV'){
      this.getAllFechaVacuna(new Date(), new Date());
    }
  }

  getAllEstadoVacuna(estado: any){
    this.empleadoService.getAllEstadoVacunacion(estado).subscribe(
      (result: ResponseDto)=>{
        this.empleadosBusquedaList=[];
        if(result.error === false){
        for (let empleado of result.auto){     
          this.empleadosBusquedaList.push(empleado as EmpleadoBusqueda);
        }
      }}
    )
  }

  getAllTipoVacuna(tipo: any){
    this.empleadoService.getAllTipoVacuna(tipo).subscribe(
      (result: ResponseDto)=>{
        this.empleadosBusquedaList=[];
        if(result.error === false){
        for (let empleado of result.auto){     
          this.empleadosBusquedaList.push(empleado as EmpleadoBusqueda);
        }
      }}
    )
  }
  
  getAllFechaVacuna(fechaInicio: Date, fechaFin: Date){
    this.empleadoService.getAllFechaVacunacion(fechaInicio, fechaFin).subscribe(
      (result: ResponseDto)=>{
        this.empleadosBusquedaList=[];
        if(result.error === false){
        for (let empleado of result.auto){     
          this.empleadosBusquedaList.push(empleado as EmpleadoBusqueda);
        }
      }}
    )
  }

 
}

interface TipoVacuna {
  name: string,
  code: string
}

interface EstadoVacuna {
  name: string,
  code: boolean
}
