import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;

  eventBusSub?: Subscription;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.storageService.getUser();
    }
  }

  logout(): void {
    this.storageService.clean();
    this.isLoggedIn = false;
  }
}
