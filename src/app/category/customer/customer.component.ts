import { Component, OnInit } from '@angular/core';
import { Customer } from './Customer';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
export interface CustomerSearchRequest {
  pageSize?: number;
  page?: number;
  code?: string;
  name?: string;
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
// export class CustomerComponent implements OnInit {

//   totalRecords: number = 0;

//   //page
//   pageSizeOptions: number[] = [10, 25, 50];
//   selectedPageSize: number = 10;

//   originalCustomers: Customer[] = [];
//   searchText: string = '';
//   customers: Customer[] = [];
//   numRows: Number = 0;
//   constructor(private router: Router,
//     private route: ActivatedRoute,
//     private http: HttpClient) { }

//   ngOnInit() {
//     // this.fetchCustomers();
//     this.search();
//   }

//   fetchCustomers() {
//     this.http.get<Customer[]>('http://localhost:8087/api/v1/customer').subscribe((data) => {
//       this.originalCustomers = data;
//       this.customers = this.originalCustomers;
//       this.numRows = this.customers.length;
//     });
//   }

//   onPageChange(event: any) { 
//     const newPage = Math.floor(event.first / event.rows) + 1;
//     this.test(newPage, this.selectedPageSize);
//     console.log("newPage: ", newPage);
//   }

//   onPageSizeChange(event: any) {
//     const newPageSize = event.rows;
//     this.test(1, newPageSize)
//     console.log("pageSize: ", newPageSize);
//   }

//   getTagSeverity(status: string): string {
//     if (status === 'Hoạt động') {
//       return 'success';
//     } else if (status === 'Không hoạt động') {
//       return 'danger';
//     } else if (status === 'Tạm dừng') {
//       return 'info';
//     } else {
//       return 'warning';
//     }
//   }

//   exportToExcel() {
//     this.http.get('http://localhost:8087/api/v1/customer/export', {
//       responseType: 'arraybuffer' as 'json' 
//     }).subscribe((data: any) => {
//       const blob = new Blob([data], { type: '.xlsx' });
//       const url= window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'customers.xlsx';
//       link.click();
//       window.URL.revokeObjectURL(url);
//     });
//   }

//   routerLink(customer: Customer) {
//     this.router.navigate(['detail', customer.id], { relativeTo: this.route });
//   }

//   search() {
//     const searchText = this.searchText.trim().toLowerCase();

//     if (searchText === '') {
//       // this.fetchCustomers();
//       // this.customers = this.originalCustomers;
//       const empySearchRequest: CustomerSearchRequest = {
//         code: '',
//         name: ''
//       };
//       this.http.post<any>('http://localhost:8087/api/v1/customer/search', empySearchRequest).subscribe((response) => {
//         console.log('API Response:', response);
//         const responseData = response.data;
//         if (Array.isArray(responseData)) {
//           this.customers = responseData;
//         } else {
//           this.customers = [];
//         }
//         this.numRows = this.customers.length;
//       });
//     } else {
//       const searchRequest: CustomerSearchRequest = {
//         pageSize: this.selectedPageSize,
//         code: searchText,
//         name: ''
//       };

//       this.http
//         .post<any>('http://localhost:8087/api/v1/customer/search', searchRequest)
//         .subscribe((response) => {
//           console.log('API Response:', response);
//           const responseData = response.data;
//           if (Array.isArray(responseData)) {
//             this.customers = responseData;
//           } else {
//             this.customers = [];
//           }
//           this.numRows = this.customers.length;
//         });
//     }
//   }

//   test(page: number, pageSize: number) {
//     const searchText = this.searchText.trim().toLowerCase();

//         const searchRequest: CustomerSearchRequest = {
//             pageSize: pageSize,
//             page: page, 
//             code: '', 
//             name: '' 
//         };

//         this.http
//             .post<any>('http://localhost:8087/api/v1/customer/search', searchRequest)
//             .subscribe((response) => {
//                 console.log('API Response:', response);

//                 const responseData = response.data;
//                 if (Array.isArray(responseData)) {
//                     this.customers = responseData;
//                 } else {
//                     this.customers = [];
//                 }
//                 this.numRows = this.customers.length;
//             });
//   }

// }
export class CustomerComponent implements OnInit {

  totalRecords: number = 0;
  pageSizeOptions: number[] = [10, 25, 50];
  selectedPageSize: number = 10;
  originalCustomers: Customer[] = [];
  searchText: string = '';
  customers: Customer[] = [];
  numRows: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.search();
  }

  onPageChange(event: any) {
    const newPage = Math.floor(event.first / event.rows) + 1;
    this.loadCustomers(newPage, this.selectedPageSize);
  }

  onPageSizeChange(event: any) {
    this.selectedPageSize = event.rows;
    this.loadCustomers(1, this.selectedPageSize);
  }

  getTagSeverity(status: string): string {
    switch (status) {
      case 'Hoạt động':
        return 'success';
      case 'Không hoạt động':
        return 'danger';
      case 'Tạm dừng':
        return 'info';
      default:
        return 'warning';
    }
  }

  exportToExcel() {
    this.http.get('http://localhost:8087/api/v1/customer/export', {
      responseType: 'arraybuffer' as 'json'
    }).subscribe((data: any) => {
      const blob = new Blob([data], { type: '.xlsx' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'customers.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  routerLink(customer: Customer) {
    this.router.navigate(['detail', customer.id], { relativeTo: this.route });
  }

  search() {
    const searchText = this.searchText.trim().toLowerCase();

    const searchRequest: CustomerSearchRequest = {
      pageSize: this.selectedPageSize,
      code: searchText,
      name: ''
    };

    this.fetchCustomers(searchRequest);
  }

  loadCustomers(page: number, pageSize: number) {
    const searchText = this.searchText.trim().toLowerCase();

    const searchRequest: CustomerSearchRequest = {
      pageSize: pageSize,
      page: page,
      // code: searchText,
      // name: searchText
    };

    this.fetchCustomers(searchRequest);
  }

  fetchCustomers(request: CustomerSearchRequest) {
    this.http
      .post<any>('http://localhost:8087/api/v1/customer/search', request)
      .subscribe((response) => {
        console.log('API Response:', response);
        const responseData = response.data;
        this.customers = Array.isArray(responseData) ? responseData : [];
        this.totalRecords = response.totalRecords;
        this.numRows = this.customers.length;
      });
  }
}



