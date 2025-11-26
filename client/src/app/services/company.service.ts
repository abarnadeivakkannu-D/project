import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private baseUrl = 'http://localhost:3000/api/company';

    constructor(private http: HttpClient) { }

    // Get all companies
    getCompanies() {
        return this.http.get(`${this.baseUrl}/company`);
    }

    // Get users of a specific company
    getUsersByCompany(id: number) {
        return this.http.get(`${this.baseUrl}/${id}/users`);
    }
}
