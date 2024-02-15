import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CarComponent } from './car/car.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mest populære biler - 2024';
}
