import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private unique_name$ = new BehaviorSubject<String>("");
  private role$ = new BehaviorSubject<String>("");
  private nameid$= new BehaviorSubject<String>("");
 

  constructor() { }

  public getRolFromStore(){
    return this.role$.asObservable();
  }
  public setRolFromStore(role:string){
    this.role$.next(role);
  }
  
  public getnameFromStore(){
    return this.unique_name$.asObservable();
  }
  public setNameFromStore(unique_name:string){
    this.unique_name$.next(unique_name);
  }

  public getIdFromStore(){
    return this.nameid$.asObservable();
  }
  public setIdFromStore(nameid:string){
    this.nameid$.next(nameid);
  }
}
