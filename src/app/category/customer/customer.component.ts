import { Component, OnInit } from '@angular/core';
import { Customer } from './Customer';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
export interface CustomerSearchRequest {
  size?: number;
  page?: number;
  code?: string;
  name?: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

  totalRecord: number = 1;
  pageSizeOptions: number[] = [10, 25, 50];
  selectedPageSize: number = 10;
  originalCustomers: Customer[] = [];
  searchText: string = '';
  customers: Customer[] = [];
  numRows: number = 0;

  currentPage: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadCustomers(this.currentPage, this.selectedPageSize);
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    const pageSize = event.rows;
    this.loadCustomers(this.currentPage, pageSize);
  }

  onPageSizeChange(event: any) {
    this.selectedPageSize = event;
    this.currentPage = 1;
    this.loadCustomers(this.currentPage, this.selectedPageSize);
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
      size: this.selectedPageSize,
      code: searchText,
      name: ''
    };

    this.fetchCustomers(searchRequest);
  }

  loadCustomers(page: number, size: number) {
    const searchText = this.searchText.trim().toLowerCase();

    const searchRequest: CustomerSearchRequest = {
      size: size,
      page: page,
      code: searchText,
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
        this.totalRecord = response.totalRecord;
        this.numRows = this.customers.length;
      });
  }
}
