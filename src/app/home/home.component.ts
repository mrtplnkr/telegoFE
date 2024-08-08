import { Component, OnInit } from '@angular/core';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    // this.itemService.getItemsByUserId(2).subscribe({
    //   next: (data) => {
    //     this.content = data;
    //   },
    //   error: (err) => {
    //     if (err.error) {
    //       try {
    //         const res = JSON.parse(err.error);
    //         this.content = res.message;
    //       } catch {
    //         this.content = `Error with status: ${err.status} - ${err.statusText}`;
    //       }
    //     } else {
    //       this.content = `Error with status: ${err.status}`;
    //     }
    //   },
    // });
  }
}
