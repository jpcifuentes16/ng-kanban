import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { SubTask } from '../../../models/subTask.model';
import { TagComponent } from '../../tag/tag.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [TagComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() actividad!: Task;

  calculateCompleted(subtasks: SubTask[]): number {
    return subtasks.filter((s) => s.isCompleted).length;
  }
}
