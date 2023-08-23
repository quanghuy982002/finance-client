import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer/Customer';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer | undefined;
  
  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const customerId = +params['id'];

      const apiUrl = `http://localhost:8087/api/v1/customer/${customerId}`;
      
      this.http.get<Customer>(apiUrl).subscribe(
        (data: Customer) => {
          this.customer = data;
        },
        error => {
          console.error('Lỗi khi lấy dữ liệu khách hàng:', error);
        }
      );
    });
  }
}
