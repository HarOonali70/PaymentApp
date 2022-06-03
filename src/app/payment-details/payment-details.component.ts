import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';
import { PaymentDetails } from 'src/app/shared/payment-details.model'
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service : PaymentDetailsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord : PaymentDetails){
    this.service.formData = Object.assign({}, selectedRecord);
  }
  onDelete(id:number){
    if(confirm('Are you sure you want to delete this'))
    {
      this.service.deletePaymentDetail(id)
      .subscribe(
        res =>{
          this.service.refreshList();
          this.toastr.error("Sucessfully Deleted","payment detail Register");
        },
        err => { console.log(err)}
      )
    }
    
  }
}
