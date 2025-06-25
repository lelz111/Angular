import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Creditur } from '../../../model/creditur.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
})
export class Table {
  @Input() childrenData: Creditur[] = [];
  @Output() deleteEmiter = new EventEmitter<number>();
  @Output() buttonEmiter = new EventEmitter<string>();

  deleteItem(index: number) {
    this.deleteEmiter.emit(index);
  }

  sendToParent() {
    this.buttonEmiter.emit('Halo dari table!');
  }
}
