import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Todo item list
  items = [
    {name: 'Discussion 5', status: 'pending'},
    {name: 'ICP 5', status: 'pending'},
    {name: 'Create Video for ICP5', status: 'pending'},
    {name: 'Submit feedback 5', status: 'pending'}
  ];

  // Contains TextField input value
  taskName: string;

  // Create new Todo Task
  submitNewItem() {
    if (this.taskName && this.taskName !== '') {
      this.items.push({name: this.taskName, status: 'pending'});
      this.taskName = '';
    }
  }

  // Switch between pending and complete status for a particular task
  completeItem(itemIdx: number) {
    if (this.items[itemIdx].status === 'pending') {
      this.items[itemIdx].status = 'completed';
    } else {
      this.items[itemIdx].status = 'pending';
    }
  }

  // Delete the particular task
  deleteItem(itemIdx: number) {
    this.items.splice(itemIdx, 1);
  }

}
