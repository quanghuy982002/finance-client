import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role, RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {
  constructor(private activateRoute: ActivatedRoute, private roleService: RoleService) {
    this.roleId = Number(this.activateRoute.snapshot.paramMap.get('id'))
  }
  staffs: any;
  id!: number;
  roleId: number = 0;
  role: Role | undefined;

  ngOnInit(): void {
    this.getRoleById(this.roleId);
    this.getStaffByRoleId(this.roleId);
  }

  getStaffByRoleId(id: number) {
    this.roleService.getStaffByRoleId(id).subscribe(data => {
      this.staffs = data;
      console.log(this.staffs)
    })
  }

  getRoleById(id: number) {
    this.roleService.getRoleById(id).subscribe(data => {
      this.role = data;
      console.log(this.role)
    })
  }

  getSeverity(status: boolean|undefined) {
    if (status) {
      return "success"
    } else {
      return "danger"
    }
  }

  translateStatus(status: boolean) {
    if (status) {
      return "Đang làm việc"
    } else {
      return "Nghỉ"
    }
  }

  translateRoleStatus(status: boolean|undefined) {
    if (status) {
      return 'Hoạt động';
    }
    else return 'Không hoạt động'
  }
}

