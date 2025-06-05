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

  currentMonth = new Date();

  ngOnInit(): void {
    this.generateCalendar();
  }

  prevMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1,
    );
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1,
    );
    this.generateCalendar();
  }

  get monthLabel(): string {
    return this.currentMonth.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  }

  private generateCalendar() {
    this.weeks = [];
    const firstDay = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1,
    );
    const lastDay = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0,
    );

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
        const start = task.startDate ?? task.endDate ?? task.dueDate;
        const end = task.endDate ?? task.dueDate ?? task.startDate;
        if (!start || !end) {
          return;
        }
        if (start <= dateStr && dateStr <= end) {
          tasks.push(task);
        }
      });
    });
    return tasks;
  }
}
