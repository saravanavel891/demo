import { Injectable } from "@angular/core";
import { Employee } from "./test.component";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TestService {
    data = 'test Mahe';

    /**
     * Method used to transform the data based on our need
     * @returns observable
     */
    public transformedData(): Observable<Array<Employee>> {
        return this.getTableDate().pipe(
            map(employeeList => {
                employeeList.forEach(employee => {
                    employee.role = this.populateUserRole(employee.skilSet);
                });

                return employeeList;
            })
        );
    }

    /**
     * This method used to manupulate the user role
     * @param skilset 
     * @returns user role
     */
    private populateUserRole(skilset: any): string {
        return (skilset.indexOf('java') > -1 && skilset.indexOf('angular') > -1 && skilset.indexOf('oracle') > -1) ? 'Full Stack Developer'
            : (skilset.indexOf('java') > -1 && skilset.indexOf('oracle') > -1) ? 'Java Developer'
                : (skilset.indexOf('informatica') > -1 && skilset.indexOf('oracle') > -1) ? 'Backend Developer' : 'UI Developer'
    }

    /**
     * Method used to load the data from josn or API call
     * @returns observable
     */
    public getTableDate(): Observable<Array<Employee>> {
        return of(this.populateRandomData());
    }

    /**
     * This method used to populate the random employee array
     * @returns employee array
     */
    populateRandomData(): any {
        let employeeList = [];
        for (var i = 1; i < 100000; i++) {
            const name = 'john' + i;
            let dept;
            let skilset;
            if (name.indexOf('2') > -1) {
                dept = 'AVM';
                skilset = ['java', 'informatica', 'oracle'];
            } else if (name.indexOf('3') > -1) {
                dept = 'IDE';
                skilset = ['oracle', 'informatica', 'cognos'];
            } else if (name.indexOf('4') > -1 || name.indexOf('5') > -1) {
                dept = 'DEP';
                skilset = ['java', 'angular', 'oracle']
            } else {
                dept = 'WEB';
                skilset = ['angular', 'react']
            }
            employeeList.push(
                {
                    name: name,
                    age: 25,
                    dept: dept,
                    skilSet: skilset

                }
            )
        }

        return employeeList;
    }
}