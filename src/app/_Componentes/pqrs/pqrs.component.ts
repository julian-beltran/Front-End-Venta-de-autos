import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Pqrs } from 'src/app/_Modelos/pqrs';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { PqrsService } from 'src/app/_servicios/pqrs.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css']
})
export class PqrsComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['peticion', 'queja','reclamo','sugerencia'];
  filteredOptions: Observable<string[]>;
  public id:number
  public idname: string="";
  public pqrsForm = this.fb.group({
    tipoPqrs:['', Validators.required],
    mensaje:['', Validators.required],

  });
  constructor(private userStore: UserStoreService,
    private barraProgresoService: BarraDeProgresoService, public authServicesService:AuthServicesService,
    private fb:FormBuilder,public pqrsService:PqrsService) { }

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe(val=>{
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken
      this.id= Number(this.idname);
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }


  add(){
    this.barraProgresoService.progressBarReactiva.next(false);
    let pqrs: Pqrs = {
      ...this.pqrsForm.value
    }
    pqrs.idCliente = this.id;

    this.pqrsService.addPqrs(pqrs).subscribe(response=>{
      if(response.exito===1){
        alert(response.mensaje)
        this.barraProgresoService.progressBarReactiva.next(true);
      }else{
        alert(response.mensaje)
        this.barraProgresoService.progressBarReactiva.next(true);
      }
      
    })
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
