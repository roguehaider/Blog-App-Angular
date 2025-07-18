import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivityService } from './services/activity.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activityService.initializeInactivityTimer();
  }
}
