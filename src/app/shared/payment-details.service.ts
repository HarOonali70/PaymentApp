import { Injectable } from '@angular/core';
import { PaymentDetails } from './payment-details.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:30214/api/PaymentDetail'
  formData:PaymentDetails = new PaymentDetails();
  list : PaymentDetails[];
  
  
  postPaymentDetail(){
    return this.http.post(this.baseURL , this.formData)
  }
  putPaymentDetail(){
    debugger;
    return this.http.put(`${this.baseURL}?id=${this.formData.paymentDetailId}`, this.formData)
  }
  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as PaymentDetails[])
  }
  deletePaymentDetail(id:number){
    return this.http.delete(`${this.baseURL}?id=${id}`)
  }
}
