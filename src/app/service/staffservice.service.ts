import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from './role.service';
import { Project } from './project.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StaffserviceService {

  constructor(private http: HttpClient) { }



  staffs: Staff[] = []

  getProjectsByStaffId(staffId: number){
    const staff = this.staffs.find(staff => staff.id === staffId);
    if (staff) {
      return staff.project;
    }
    return null;
  }

  getDetailById(id: number) {
    return this.http.get<any>(`http://localhost:8087/api/staff/get/${id}`)
  }

  // fetchStaffs() {
  //   return this.http.post<any>('http://localhost:8087/api/staff/search', {})
  // }

  fetchStaffs(request?: any) {
    if (!request) {
      return this.http.post<any>('http://localhost:8087/api/staff/search',{})
    }
    return this.http.post<any>('http://localhost:8087/api/staff/search', request)
  }

}
export interface Staff {
  id: number;
  name: string;
  picture: string | null;
  email: string;
  department: Department;
  title: Role;
  status: boolean;
  project: Project[];
}
export interface Department {
  id: number;
  name: string;
}

export { Project };
// export interface Project {
//   project: string,
//   picture: string,
//   role: string,
//   startDate: string,
//   endDate: string,
//   status: boolean
// }
