import { Component, OnInit } from '@angular/core';
import { Customer } from './Customer';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  originalCustomers: Customer[] = [];
  searchText: string = '';
  customers: Customer[] = [];
  numRows: Number = 0;
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Customer[]>('http://localhost:8087/api/v1/customer').subscribe((data) => {
      this.originalCustomers = data;
      this.customers = this.originalCustomers;
      this.numRows = this.customers.length;
    });
  }

  getTagSeverity(status: string): string {
    if (status === 'Hoạt động') {
        return 'success';
    } else if (status === 'Không hoạt động') {
        return 'danger';
    } else if (status === 'Tạm dừng') {
        return 'info';
    } else {
        return 'warning';
    }
  }

  exportToExcel() {
    const fileName = 'danh-sach-khach-hang.xlsx';
    const sheetName = 'Danh sách khách hàng';

    const data: any[][] = [
      ['#', 'Mã khách hàng', 'Tên khách hàng', 'Nhóm khách hàng', 'Trạng thái']
    ];

    this.customers.forEach((customer, index) => {
      data.push([
        index + 1,
        customer.code,
        customer.name,
        customer.groupName,
        customer.status
      ]);
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, fileName);
  }

  routerLink(customer: Customer) {
    this.router.navigate(['detail', customer.id], { relativeTo: this.route });
  }

  search() {
    if (this.searchText) {
      this.customers = this.filterCustomers(this.searchText);
      this.numRows = this.customers.length;
    } else {
      this.customers = this.originalCustomers;
      this.numRows = this.customers.length;
    }
  }

  filterCustomers(searchText: string): Customer[] {
    searchText = searchText.toLowerCase();
    return this.customers.filter(
      customer =>
        customer &&
        (customer.code && customer.code.toLowerCase().includes(searchText)) ||
        (customer.name && customer.name.toLowerCase().includes(searchText)) ||
        (customer.groupName && customer.groupName.toLowerCase().includes(searchText)) ||
        (customer.status && customer.status.toLowerCase().includes(searchText))
    );
  }
}
