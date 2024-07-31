import { Component, Input } from '@angular/core';
import { Prioridad } from '../../enums/prioridad.enum';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input() prioridad!: Prioridad;
}
