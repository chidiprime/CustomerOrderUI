import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  customers: Customer[] = [];
  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAll().subscribe((data: Customer[])=>{
      this.customers = data;
      console.log(this.customers);
    })  
  }
  deletecustomer(id){
    this.customerService.delete(id).subscribe(res => {
         this.customers = this.customers.filter(item => item.Id !== id);
         console.log('customer deleted successfully!');
    })
  }

}
