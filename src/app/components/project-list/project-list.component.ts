import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../models/board.model';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewTaskModalComponent } from '../modals/view-task-modal/view-task-modal.component';
import { TaskOption } from '../../models/modal.model';
import { TaskCardComponent } from '../project-board/task-card/task-card.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, TaskCardComponent, ViewTaskModalComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  @Input() activeBoard!: Board | null;
  @Input() darkMode = false;
  @Output() columnAdd = new EventEmitter<void>();
  @Output() boardEdit = new EventEmitter<Board>();
  @Output() taskUpdate = new EventEmitter<{ task: Task; columnName: string }>();
  @Output() taskUpdateModal = new EventEmitter<Task>();
  @Output() taskDeleteModal = new EventEmitter<Task>();

  constructor(private dialog: MatDialog) {}

  addColumn(): void {
    this.columnAdd.emit();
  }

  viewTask(readTask: Task): void {
    const dialogRef = this.dialog.open(ViewTaskModalComponent, {
      data: {
        task: readTask,
        columns: this.activeBoard?.columns,
        darkMode: this.darkMode,
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskOption) => {
      if (result === TaskOption.Edit) {
        this.taskUpdateModal.emit(readTask);
      } else if (result === TaskOption.Delete) {
        this.taskDeleteModal.emit(readTask);
      } else {
        const updateTask = {
          task: dialogRef.componentInstance.data.task,
          columnName: dialogRef.componentInstance.activeStatus.name,
        };

        this.taskUpdate.emit(updateTask);
      }
    });
  }
}
