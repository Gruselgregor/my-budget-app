import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
