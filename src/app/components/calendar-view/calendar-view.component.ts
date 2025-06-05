import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { Task } from '../../models/task.model';

interface Day {
  date: Date;
  tasks: Task[];
}

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss',
})
export class CalendarViewComponent implements OnInit {
  @Input() activeBoard: Board | null = null;

  weeks: Day[][] = [];
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit(): void {
    this.generateCalendar();
  }

  private generateCalendar() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let current = new Date(firstDay);
    current.setDate(current.getDate() - current.getDay());

    while (current <= lastDay || current.getDay() !== 0) {
      const week: Day[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(current);
        week.push({ date, tasks: this.tasksForDate(date) });
        current.setDate(current.getDate() + 1);
      }
      this.weeks.push(week);
      if (current > lastDay && current.getDay() === 0) {
        break;
      }
    }
  }

  private tasksForDate(date: Date): Task[] {
    if (!this.activeBoard) {
      return [];
    }
    const dateStr = date.toISOString().slice(0, 10);
    const tasks: Task[] = [];
    this.activeBoard.columns.forEach((column) => {
      column.tasks.forEach((task) => {
        if (task.dueDate === dateStr) {
          tasks.push(task);
        }
      });
    });
    return tasks;
  }
}
