import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IRASIA_ADMIN';
  logon: boolean=false;
  showSolutions:boolean = false; 
  isOpen : boolean= false;

  ngOnInit(): void {  
    
  }
  
}
