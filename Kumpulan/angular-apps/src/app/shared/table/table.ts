import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderService } from '../../../services/reminder/reminder.service';
import { Creditur } from '../../../model/creditur.interface';
import { Router } from '@angular/router'; // ✅ Tambahkan ini

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.scss']
})
export class Table {
  @Input() childrenData: Creditur[] = [];
  @Output() deleteEmitter = new EventEmitter<Creditur>();
  @Output() buttonEmiter = new EventEmitter<string>();

  constructor(
    private reminderService: ReminderService,
    private router: Router // ✅ Tambahkan ini
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childrenData']) {
      console.log('💡 Data table updated:', this.childrenData);
    }
  }

  onDelete(item: Creditur) {
    this.deleteEmitter.emit(item);
  }

  onRowClick(item: Creditur) {
    this.reminderService.showReminder(item); // ✅ Masih jalan
    if (item.id) {
      this.router.navigate(['/creditur', item.id]); // ✅ Navigasi ke halaman detail
    }
  }
}
