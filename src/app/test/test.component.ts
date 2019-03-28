import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TestService } from './test-service';
import { columnDefs } from './col-def';
import { SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [TestService]
})
export class TestComponent implements OnInit, OnDestroy {

  @Input() testName: string;
  columNames = columnDefs;
  employeeList: Employee[] = [];
  timeTaken = ' -- --';
  dataSubscription: ISubscription; 

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.columNames = columnDefs
    this.testName = this.testService.data;
  }

  onGridReady(param) {
    param.api.sizeColumnsToFit()
  }

  ngOnDestroy() {
    if(this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  loadTable() {
    const startTime = new Date().getTime();
    this.dataSubscription = this.testService.transformedData().subscribe(response => {
      this.employeeList = response;
      const endTime = new Date().getTime();
      this.timeTaken = (endTime - startTime) + ' ms';
    });

  }





}

export interface Employee {
  name: string;
  age: number;
  dept: string;
  skilSet: any;
  role: string;
}
