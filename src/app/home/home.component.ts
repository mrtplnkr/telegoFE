import { Component, OnInit } from '@angular/core';
import { ItemService } from '../_services/item.service';
import { StorageService } from '../_services/storage.service';
import { TodoItem } from '../_services/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items?: TodoItem[];
  form: any = {
    text: null,
  };
  error: string = '';
  filterChecked?: boolean = undefined;

  constructor(
    private itemService: ItemService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.storage.isLoggedIn()) this.router.navigate(['/login']);
    this.itemService.getItemsByUserId().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        this.error = `Some trouble on BE- ${err.status}`;
      },
    });
  }

  sortItems() {
    this.items?.sort((a, b) => (a.text > b.text ? 1 : -1));
  }

  changeFilter() {
    this.filterChecked = !this.filterChecked;
  }

  filterItems(all: TodoItem[]): TodoItem[] {
    return all.filter(
      (i) => this.filterChecked == undefined || i.done === this.filterChecked
    );
  }

  onSubmit() {
    const { text } = this.form;
    this.itemService.createNewItem(text).subscribe({
      next: (res: any) => {
        if (res > 0) {
          this.items?.push({
            text: text,
            done: false,
            id: res, //res.id
          });
          this.form.text = '';
        }
      },
      error: (err) => {
        this.error = `Some trouble on BE- ${err.status}`;
      },
    });
  }

  updateItem(id: number) {
    const done = this.items?.find((x) => x.id === id)?.done;
    this.itemService.updateItem(id, !done).subscribe({
      next: () => {
        //find and update or just recall api
        console.log('eer');

        this.items = this.items?.map((x) =>
          x.id === id ? { ...x, done: !done } : x
        );
      },
      error: (err) => {
        console.log('err' + err);
      },
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: (res: any) => {
        if (res === 200) {
          this.items = this.items?.filter((x) => x.id !== id);
        }
      },
      error: (err) => {
        this.error = 'Error while deleting item' + err;
      },
    });
  }
}
