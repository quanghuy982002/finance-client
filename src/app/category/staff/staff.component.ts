import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { StaffserviceService } from 'src/app/service/staffservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  constructor(
    private staffService: StaffserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.items = this.staffService.staffs;
  }

  dict: any = {};

  items: any[] = [];
  keys = ['name', 'email', 'department', 'title', 'status'];

  colnames: string[] = [
    'Nhân viên',
    'Email',
    'Đơn vị',
    'Chức danh',
    'Trạng thái',
  ];

  numRows: number = 0;
  options: number[] = [10, 25, 50];
  first: number = 0;
  totalRecords: number = 0;

  searchText: any;

  ngOnInit(): void {
    this.keys.forEach((key, i) => (this.dict[key] = this.colnames[i]));
    // this.staffService.request.code = ""
    this.filterStaffs(this.searchText)
  }

  filterStaffs(input?: string) {
    this.staffService.fetchStaffs({code: input}).subscribe((data) => {this.items = data.data; this.totalRecords = this.items.length });
  }

  getSeverity(staff: any): string {
    if (!staff.status) {
      return 'danger';
    } else {
      return 'success';
    }
  }

  getStatus(status: boolean) {
    if (status) {
      return 'Hoạt động';
    } else {
      return 'Không hoạt động';
    }
  }
  exportToCSV() {

    this.http.get('http://localhost:8087/api/staff/staff/export', {
    responseType: 'arraybuffer' as 'json'
  }).subscribe((data: any) => {
    const blob = new Blob([data], { type: '.xlsx' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'staffs.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  });

  }
  onRowClick(id: string) {
    this.router.navigate(['detail', id], { relativeTo: this.route });
  }
}
