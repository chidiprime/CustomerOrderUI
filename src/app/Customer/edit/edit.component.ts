import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number;
  customer: Customer;
  form: FormGroup;
  constructor( public customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['customerId'];
    this.customerService.find(this.id).subscribe((data: Customer)=>{
      this.customer = data;
    });
    
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }
  get f(){
    return this.form.controls;
  }
       
  submit(){
    console.log(this.form.value);
    this.customerService.update(this.id, this.form.value).subscribe(res => {
         console.log('customer updated successfully!');
         this.router.navigateByUrl('customer/index');
    })
  }
}
