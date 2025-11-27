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
  totalRecords = 0;

  // Pagination
  page = 1;
  limit = 10;
  rows = 10;       // used for paginator
  loading = false;

  // Dialog and form
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
    this.loadUsers({ first: 0, rows: this.rows });
  }

  // ===============================
  // LOAD USERS (SERVER PAGINATION)
  // ===============================
  loadUsers(event?: any) {
    this.loading = true;

    const page = event?.first / event?.rows + 1 || this.page;
    const limit = event?.rows || this.limit;

    this.userService.getUsers(page, limit).subscribe({
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

  // ===============================
  // PAGINATOR CHANGE
  // ===============================
  onPageChange(event: any) {
    this.page = (event.page ?? 0) + 1;
    this.limit = event.rows ?? this.limit;
    this.loadUsers(event);
  }

  // ===============================
  // OPEN CREATE DIALOG
  // ===============================
  openCreateDialog() {
    this.isEditMode = false;
    this.userFormData = { id: null, name: '', email: '', password: '' };
    this.displayUserDialog = true;
  }

  // ===============================
  // OPEN EDIT DIALOG
  // ===============================
  openEditDialog(user: any) {
    this.isEditMode = true;
    this.userFormData = { ...user };
    this.displayUserDialog = true;
  }

  // ===============================
  // SAVE USER (CREATE + UPDATE)
  // ===============================
  saveUser() {
    if (this.isEditMode) {
      // UPDATE
      this.http.put<any>(`http://localhost:3000/api/users/${this.userFormData.id}`, this.userFormData)
        .subscribe(res => {
          if (res.status === 200) {
            alert('User updated successfully');
            this.displayUserDialog = false;
            this.loadUsers({ first: 0, rows: this.rows });
          } else {
            alert(res.reason);
          }
        });
    } else {
      // CREATE
      this.http.post<any>('http://localhost:3000/api/users/', this.userFormData)
        .subscribe(res => {
          if (res.status === 201) {
            alert('User created successfully');
            this.displayUserDialog = false;
            this.loadUsers({ first: 0, rows: this.rows });
          } else {
            alert(res.reason);
          }
        });
    }
  }

  // ===============================
  // DELETE USER
  // ===============================
  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.http.delete<any>(`http://localhost:3000/api/users/${id}`)
      .subscribe(res => {
        if (res.status === 200) {
          alert('User deleted successfully');
          this.loadUsers({ first: 0, rows: this.rows });
        } else {
          alert(res.reason);
        }
      });
  }

}
