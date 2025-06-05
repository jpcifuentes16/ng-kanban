import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Input() boards: Board[] = [];

  get boardCount(): number {
    return this.boards.length;
  }

  boardStats() {
    return this.boards.map((board) => ({
      name: board.name,
      totalTasks: board.columns.reduce((t, c) => t + c.tasks.length, 0),
      columns: board.columns.map((c) => ({
        name: c.name,
        count: c.tasks.length,
      })),
    }));
  }
}
