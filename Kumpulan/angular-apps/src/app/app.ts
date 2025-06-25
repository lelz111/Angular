import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form } from './shared/form/form';
import { Table } from './shared/table/table';
import { Creditur } from '../model/creditur.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Form, Table],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  // Static default data
  defaultData: Creditur[] = [
    { name: 'A', age: 30, job: 'Karyawan' },
    { name: 'B', age: 25, job: 'Wirausaha' }
  ];

  // Actual data
  parenData: Creditur[] = [...this.defaultData];

  testFromChild = '';

  addCreditur(data: Creditur) {
    this.parenData = [...this.parenData, data];
  }

  deleteData(index: number) {
    this.parenData.splice(index, 1);
  }

  receivedFromChild(e: string) {
    this.testFromChild = e;
  }
}
