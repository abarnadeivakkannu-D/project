import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

    // GET all users
    getAllUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }

    // ADD user
    addUser(data: any): Observable<any> {
        return this.http.post(this.baseUrl, data);
    }

    // UPDATE user
    updateUser(id: number, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

    // DELETE user
    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
