import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() { }
  projects: Project[] = [
    {
      id: '1',
      name: 'DuAn1',
      picture: "/assets/project.jpg",
      company: 'Bu01',
      startDate: '15/02/2023',
      endDate: '30/09/2023',
      pm: { name: 'Nguyễn Tiến Đạt', image: "/assets/avt.png" },
      category: 'Nội bộ',
      customer: 'VSS',
      status: true,
      member: [
        {
          id: 121,
          employee: { name: ' Nguyễn Văn A', image: "/assets/avt.png" },
          email: 'nguyenvanA@gmail.com ',
          start_date: '15/5/2023',
          finish_date: '15/5/2023',
          role: 'director',
          status: true,
        },
        {
          id: 121,
          employee: { name: ' Nguyễn Văn A', image: '/assets/avt.png' },
          email: 'nguyenvanA@gmail.com ',
          start_date: '15/5/2023',
          finish_date: '16/5/2023',
          role: 'pm',
          status: true,
        },
        {
          id: 4,
          employee: { name: ' Nguyễn Văn A', image: '/assets/avt.png' },
          email: 'nguyenvanA@gmail.com ',
          start_date: '15/5/2023',
          finish_date: '17/5/2023',
          role: 'pm',
          status: true,
        },
      ]
    },
    {
      id: '2',
      name: 'DuAn2',
      picture: "/assets/project.jpg",
      company: 'Bu01',
      startDate: '30/02/2023',
      endDate: '15/10/2023',
      pm: { name: 'Nguyễn Tiến Đạt', image: "/assets/avt.png" },
      category: 'Nội bộ',
      customer: 'VSS',
      status: true,
      member: [
        {
          id: 121,
          employee: { name: 'Trần Thị B', image: "/assets/avt.png" },
          email: 'nguyenvanA@gmail.com ',
          start_date: '15/5/2023',
          finish_date: '15/5/2023',
          role: 'pm',
          status: true,
        },
        {
          id: 121,
          employee: { name: ' Nguyễn Văn B', image: '/assets/avt.png' },
          email: 'nguyenvanA@gmail.com ',
          start_date: '15/5/2023',
          finish_date: '16/5/2023',
          role: 'pm',
          status: true,
        },
        {
          id: 8,
          employee: { name: ' Nguyễn Văn A', image: '/assets/avt.png' },
          email: 'nguyenvanA@gmail.com ',
          start_date: '15/5/2023',
          finish_date: '17/5/2023',
          role: 'pm',
          status: true,
        },
      ]
    },
  ];

  
  getProjectById(projectId: string) {
    if (projectId) {
      return this.projects.find(project => project.id === projectId);
    }
    else return
  }

  getProjectByMemberId(memberId: number){
    const project = this.projects.find(project => project.member.find(member => member.id === memberId));
    if (project) {
      return project;
    }
    throw new Error("Không tìm thấy dự án cho memberId đã cho");
  }

  getProjectsList() {
    return this.projects;
  }

  getMemberById(projectId: string) {
    const project = this.projects.find(project => project.id === projectId);
    if (project) {
      return project.member;
    }
    return [];
  }
}

export interface Project {
  id: string
  name: string;
  picture: string;
  company: string;
  startDate: string;
  endDate: string;
  pm: Representatives;
  category: string;
  customer: string;
  status: boolean;
  member: Member[];

}

export interface Representatives {
  name: string;
  image: string;
}

export interface Member {
  id: number;
  employee: Representatives;
  email: string;
  start_date: string;
  finish_date: string;
  role: string;
  status: boolean;
}
