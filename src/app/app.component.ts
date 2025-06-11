import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IRASIA_ADMIN';
  logon: boolean = false;
  showSolutions: boolean = false; 
  isOpen: boolean = false;
  hideDashboard: boolean = false; // Variabel untuk menyembunyikan dashboard

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const hiddenPages = ['/ProductList', '/EmployeeList', '/BannersList','/BannerTypesList','/RequestList','/RegistrationList','/RequestUpdList/Update/','/QuotationListManual','/QuotationListProduct']; // Halaman yang harus menyembunyikan dashboard
      this.hideDashboard = hiddenPages.some(page => this.router.url.includes(page));
    });
  }

  ngOnInit(): void {  
    // Bisa tambahkan inisialisasi jika diperlukan
  }
}
