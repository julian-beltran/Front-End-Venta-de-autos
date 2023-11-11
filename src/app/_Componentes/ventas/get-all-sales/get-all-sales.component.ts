import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BarraDeProgresoService } from 'src/app/_servicios/barra-de-progreso.service';
import { SaleService } from 'src/app/_servicios/sale.service';

@Component({
  selector: 'app-get-all-sales',
  templateUrl: './get-all-sales.component.html',
  styleUrls: ['./get-all-sales.component.css']
})
export class GetAllSalesComponent implements OnInit {
  public lst= new MatTableDataSource() ;
  public display:string[]=['imagen','id','nombre','telefono','Nombre paypal','vehiculo','placa']
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(private barraProgresoService: BarraDeProgresoService,public saleService:SaleService,
) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.saleService.getAllSales().subscribe(response=>{
      this.lst=new MatTableDataSource(response.data);
      this.lst.paginator = this.paginator;
      this.barraProgresoService.progressBarReactiva.next(true);
  })}


}
