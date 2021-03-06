import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetails } from 'src/app/shared/payment-details.model';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service : PaymentDetailsService
    ,private toastr:ToastrService) { }
  //constructor() { }
  ngOnInit(): void {
  }
  onsubmit(form:NgForm){
    if(this.service.formData.paymentDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res =>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted Successfully','Payment Detail Register')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res =>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Update Successfully','Payment Detail Register')
      },
      err => { console.log(err); }
    );
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetails();
  }
}
