import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { Observable, map, startWith } from 'rxjs';
import { Register } from 'src/app/_Modelos/register';
import { AuthServicesService } from 'src/app/_servicios/auth-services.service';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { UserStoreService } from 'src/app/_servicios/user-store.service';
import { UsuariosService } from 'src/app/_servicios/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private usuariosService :UsuariosService,
    private barraProgresoService: BarraDeProgresoService,
    private router:Router, 
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private userStore: UserStoreService,
    public authServicesService:AuthServicesService) { }
    public lst: any;
    public id:number;
    public idname: string="";
    myControl2 = new FormControl('');
    options2: string[] = ['masculino', 'femenino','otro'];
    filteredOptions2: Observable<string[]>;
    azureStorageBaseUrl = environment.azureStorageBaseUrl;
  @ViewChild('imageFileUpload', { static: false }) imageFileUpload?: FileUpload;

    public loginForm = this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      telefono:['', Validators.required],
      ocupacion:['', Validators.required],
      sexo:['', Validators.required],
      direccion:['', Validators.required],
      edad:[, Validators.required],
      usuario1: ['', Validators.required],
      email:['', Validators.required]
    });
      
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      const id =params['id'];
      this.loadUser(id);
      
    });

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value)),
    );

    this.userStore.getIdFromStore().subscribe(val=>{
      const IdFromToken = this.authServicesService.getIdFromToken();
      this.idname = val || IdFromToken
      this.id= Number(this.idname);
    })
  }

  loadUser(id:number): void{
    this.barraProgresoService.progressBarReactiva.next(false);
    this.usuariosService.getUser(id).subscribe(response=>{
      this.lst=response.data;
      this.barraProgresoService.progressBarReactiva.next(true);
    })

  }

  edit(event: Event){
    this.barraProgresoService.progressBarReactiva.next(false);
    let usuario:Register={
      ...this.loginForm.value
    };
    if(this.imageFileUpload?.files.length){
      usuario.imagen=this.imageFileUpload.files[0];
    }
    usuario.id = this.lst.id
    this.usuariosService.editMyUser(usuario).subscribe({
      next:(Response)=>{
        if(Response.exito===1){
          alert(Response.mensaje);
          this.router.navigate(['/MiPerfil']);
          this.barraProgresoService.progressBarReactiva.next(true);
          
        }
        alert(Response.mensaje);
        this.barraProgresoService.progressBarReactiva.next(true);

      }

    })

  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option => option.toLowerCase().includes(filterValue));
  }

  

}
