import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 1000; // Data awal statis
  transactionsToday: number = 250;
  serverStatus: string = 'Online';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    // Simulasi pengambilan data dari API setiap 5 detik
    setInterval(() => {
      this.http.get('https://api.example.com/dashboard').subscribe((data: any) => {
        this.totalUsers = data.totalUsers;
        this.transactionsToday = data.transactionsToday;
        this.serverStatus = data.serverStatus;
      });
    }, 5000);
  }
}
