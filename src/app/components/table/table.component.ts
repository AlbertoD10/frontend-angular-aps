import { Component, OnInit } from '@angular/core';
const toDelete = {
  _id: '',
  CLIENTNUM: '',
  Card_Category: '',
  Customer_Age: '',
  Education_Level: '',
  Gender: '',
  Income_Category: '',
  Marital_Status: '',
  Naive_Bayes_Classifier_Attrition_Flag_Card_Category_Contacts_Count_12_mon_Dependent_count_Education_Level_Months_Inactive_12_mon_1:
    '',
  Naive_Bayes_Classifier_Attrition_Flag_Card_Category_Contacts_Count_12_mon_Dependent_count_Education_Level_Months_Inactive_12_mon_2:
    '',
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  client = JSON.parse(localStorage.getItem('client') || '');
  counter = 1;

  constructor() {}

  ngOnInit(): void {
    console.log(toDelete);

    Object.keys(toDelete).forEach((keys) => {
      delete this.client[keys];
    });
    console.log(this.client);
  }
}
