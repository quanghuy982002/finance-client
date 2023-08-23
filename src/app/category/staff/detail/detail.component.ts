import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project, Staff, StaffserviceService } from 'src/app/service/staffservice.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private staffService: StaffserviceService, private projectService: ProjectService ,private route: ActivatedRoute) {

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
  }

  dict: any = {};

  // items: any ;
  items: Project[] = [];
  // items: (Project | null)[] = [];
  keys = ['name', 'role', 'startDate', 'endDate', 'status'];

  colnames: string[] = ['Dự án', 'Vai trò', 'Ngày bắt đầu', 'Ngày kết thúc', 'Trạng thái'];

  options: number[] = [10, 25, 50]
  first: number = 0;

  id: number = 0;

  staff: any
  index: number = 0;

  ngOnInit(): void {
    this.keys.forEach((key, i) => (this.dict[key] = this.colnames[i]));
    this.staffService.getDetailById(this.id).subscribe((data) => { this.staff = data });
    this.staffService.getProjectsByStaffId(this.id)
    // console.log(this.projectService.getProjectByMemberId(this.id))
    this.items.push(this.projectService.getProjectByMemberId(this.id));
    // if (project) {
    //   this.items = project;
    // }
    // console.log(this.items)
    this.index = this.getIndexById(this.id);
    // console.log(this.index)
    
  }
  
  getIndexById(id: number) {
    return this.items[0]?.member.findIndex((item: any) => item.id === id)
  }
  getSeverity(prj: any): string {
    if (!prj.status) {
      return 'danger';
    } else {
      return 'success';
    }
  }

  translateStatus(status: boolean) {
    if (status) {
      return "Hoạt động"
    } else {
      return "Không hoạt động"
    }
  }
}
