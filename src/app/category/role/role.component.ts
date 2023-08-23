import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role, RoleService } from 'src/app/service/role.service';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  constructor(private router: Router, private roleService: RoleService, private route: ActivatedRoute) {
  }

  keys: string[] = ['id', 'roleTilte', 'roleProject', 'status'];
  colnames: string[] = ['Mã roles', 'Roles chức danh', 'Roles dự án', 'Trạng thái'];
  dict: any = {};
  roles: Role[] = [];
  numRoles: number = 0;
  ngOnInit(): void {
    this.keys.forEach((key, i) => (this.dict[key] = this.colnames[i]));
    this.roleService.getRoles().subscribe(data => {
      this.roles = data;
      this.numRoles = this.roles.length;
    })

  }
  getSeverity(status: boolean) {
    if (status) {
      return 'success'
    }
    else return 'danger'
  }
  searchRole(searchText: string) {
    this.roleService.searchRole(searchText).subscribe((data: any) => {
      this.roles = data.data;
      this.numRoles = data.totalRecord;
    })
  }
  translateStatus(status: boolean) {
    if (status) {
      return 'Hoạt động';
    }
    else return 'Không hoạt động'
  }

  navigateRoleDetail(id: number) {
    this.router.navigate(['detail', id], { relativeTo: this.route })
  }

  exportToCSV() {
    console.log('export to csv')
    const data: any[][] = [['Mã role', 'Roles dự án', 'Roles danh mục', 'Status']];
    const fileName = 'roles.xlsx';
    const sheetName = 'Danh sách Roles';

    this.roles.forEach(role => {
      data.push([role.id, role.roleTitle, role.roleProject, role.status ? 'Hoạt động' : 'Không hoạt động'])
    })

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
  }

}
