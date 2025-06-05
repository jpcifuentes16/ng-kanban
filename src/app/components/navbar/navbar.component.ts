import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() opened!: boolean;
  @Input() activeBoard!: Board | null;
  @Input() boards!: Board[];
  @Input() darkMode!: boolean;
  @Input() viewMode: 'kanban' | 'list' = 'kanban';
  @Output() boardSelect = new EventEmitter<number>();
  @Output() boardAdd = new EventEmitter<void>();
  @Output() boardEdit = new EventEmitter<void>();
  @Output() boardDelete = new EventEmitter<void>();
  @Output() taskAdd = new EventEmitter<void>();
  @Output() viewChange = new EventEmitter<'kanban' | 'list'>();

  sidebarShown = false;

  selectBoard(boardIdx: number): void {
    this.boardSelect.emit(boardIdx);
  }

  addBoard(): void {
    this.boardAdd.emit();
  }

  editBoard(): void {
    this.boardEdit.emit();
  }

  deleteBoard(): void {
    this.boardDelete.emit();
  }

  addTask(): void {
    this.taskAdd.emit();
  }

  toggleView(): void {
    const newView = this.viewMode === 'kanban' ? 'list' : 'kanban';
    this.viewChange.emit(newView);
  }

  open(): void {
    this.sidebarShown = true;
  }

  close(): void {
    this.sidebarShown = false;
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }
}
