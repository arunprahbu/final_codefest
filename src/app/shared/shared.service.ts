import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message : string
  constructor() { }
  setMsg(data){
    this.message=data

  }
  getMssg(){
    return this.message
  }
}
