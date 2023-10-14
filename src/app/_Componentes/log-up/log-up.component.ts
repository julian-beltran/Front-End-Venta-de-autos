import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';


@Component({
  selector: 'app-log-up',
  templateUrl: './log-up.component.html',
  styleUrls: ['./log-up.component.css']
})
export class LogUpComponent implements OnInit {

  public loginForm = this.fb.group({
    nombre:['', Validators.required],
    apellido:['', Validators.required],
    telefono:['', Validators.required],
    ocupacion:['', Validators.required],
    sexo:['', Validators.required],
    direccion:['', Validators.required],
    edad:[, Validators.required],
    usuario1: ['', Validators.required],
    contraseña:['', Validators.required],
    email:['', Validators.required],
    rol:['', Validators.required],
  });
  type:string ="password";
  isText: boolean = false;
  visibility: string ="visibility_off"
  myControl = new FormControl('');
  myControl2 = new FormControl('');
  options: string[] = ['comprador', 'vendedor'];
  options2: string[] = ['masculino', 'femenino','otro'];
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;

  constructor(public authService:AuthServicesService,
    private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value)),
    );
  }
  log(){
    this.authService.logUp(this.loginForm.value).subscribe({
      next:(Response)=>{
      if(Response.exito===1){
        alert(Response.mensaje);
        this.router.navigate(['/login']);
        
      }
      alert(Response.mensaje);
    },
     error:(err)=>{
       alert(" El formulario Esta mal diligenciado: "+err?.error.mensaje);
     }
  
  });
   
  }
  hideShwoPass(){
    this.isText =!this.isText;
    this.isText ? this.visibility = "visibility": this.visibility = "visibility_off";
    this.isText ? this.type = "text" : this.type ="password";

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }
}
