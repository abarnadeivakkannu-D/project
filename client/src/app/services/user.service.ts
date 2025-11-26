import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

    getUsers(page: number, limit: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/paginate?page=${page}&limit=${limit}`);
    }

    createUser(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    updateUser(id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
