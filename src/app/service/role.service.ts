import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Role[]>{
    const role = this.httpClient.get<Role[]>(`http://localhost:8087/api/role/`)
    return role
  }

  getRoleById(id: number): Observable<Role>{
    return this.httpClient.get<Role>(`http://localhost:8087/api/role/${id}`)
  }

  getStaffByRoleId(id: number): Observable<Staff[]>{
    return this.httpClient.get<Staff[]>(`http://localhost:8087/api/role/get-staffs/${id}`)
  }

  searchRole(searchText: string): Observable<Role[]>{
    return this.httpClient.post<Role[]>(`http://localhost:8087/api/role/search/`, {code: searchText})
  }
}

export interface Role {
  id: number;
  code: string;
  name: string;
  roleProject: string;
  roleTitle: string;
  status: boolean;
  staff: Staff;
}
export interface Staff {
  id: number;
  code: string;
  name: string;
  email: string;
  picture: string;
  department: {
    id: number;
    name: string;
  }
  title: string;
  status: boolean;
}