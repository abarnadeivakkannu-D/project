import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';

@Component({
    selector: 'app-company-users',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './company-users.component.html',
    styleUrls: ['./company-users.component.css']
})
export class CompanyUsersComponent {

    users: any[] = [];
    companyId!: number;
    loading = false;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private companyService: CompanyService
    ) { }

    ngOnInit() {
        this.companyId = Number(this.route.snapshot.paramMap.get('id'));
        if (!this.companyId) {
            this.error = 'Invalid company ID';
            return;
        }
        this.fetchUsers();
    }

    fetchUsers() {
        this.loading = true;
        this.companyService.getUsersByCompany(this.companyId)
            .subscribe({
                next: (res: any) => {
                    // API returns { status: 200, results: [...] }
                    this.users = Array.isArray(res) ? res : res.results;
                    this.loading = false;
                },
                error: (err) => {
                    console.error(err);
                    this.error = 'Failed to load users';
                    this.loading = false;
                }
            });
    }
}
