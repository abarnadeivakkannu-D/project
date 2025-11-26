import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [
    CommonModule,
    DialogModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    PaginatorModule
  ]
})
export class UserComponent implements OnInit {

  users: any[] = [];
  totalRecords = "totalRecords"
  page = 1;
  limit = 10;
  loading = false;

  displayUserDialog = false;
  isEditMode = false;

  userFormData = {
    id: null,
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // ==========================================
  // LOAD USERS (SERVER PAGINATION)
  // ==========================================
  loadUsers() {
    this.loading = true;

    this.userService.getUsers(this.page, this.limit).subscribe({
      next: (res: any) => {
        this.users = res.users || [];
        this.totalRecords = res.total || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert("Error loading users");
      }
    });
  }

  onPageChange(event: any) {
    this.page = (event.page ?? 0) + 1;
    this.limit = event.rows ?? this.limit;
    this.loadUsers();
  }

  // ==========================================
  // OPEN CREATE DIALOG
  // ==========================================
  openCreateDialog() {
    this.isEditMode = false;
    this.userFormData = { id: null, name: '', email: '', password: '' };
    this.displayUserDialog = true;
  }

  // ==========================================
  // OPEN EDIT DIALOG
  // ==========================================
  openEditDialog(user: any) {
    this.isEditMode = true;
    this.userFormData = { ...user };
    this.displayUserDialog = true;
  }

  // ==========================================
  // SAVE USER (CREATE + UPDATE)
  // ==========================================
  saveUser() {
    if (this.isEditMode) {

      // UPDATE
      this.http.put<any>(
        `http://localhost:3000/api/users/updateUser/${this.userFormData.id}`,
        this.userFormData
      ).subscribe(res => {
        if (res.status === 200) {
          alert('User updated');
          this.displayUserDialog = false;
          this.loadUsers();
        } else {
          alert(res.reason);
        }
      });

    } else {

      // CREATE
      this.http.post<any>(
        'http://localhost:3000/api/users/addUser',
        this.userFormData
      ).subscribe(res => {
        if (res.status === 201) {
          alert('User created');
          this.displayUserDialog = false;
          this.loadUsers();
        } else {
          alert(res.reason);
        }
      });

    }
  }

  // ==========================================
  // DELETE USER
  // ==========================================
  deleteUser(id: number) {
    if (!confirm('Are you sure?')) return;

    this.http.delete<any>(
      `http://localhost:3000/api/users/deleteUser/${id}`
    ).subscribe(res => {
      if (res.status === 200) {
        alert('User deleted');
        this.loadUsers();
      } else {
        alert(res.reason);
      }
    });
  }

}
