import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {ChartConfiguration, ChartOptions} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {ThemeService} from "../../../service/theme.service";
import {FullMemberResponse} from "../../../model/fullMemberResponse";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NameValidatorPipe} from "../../add/name-validator.pipe";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {Member} from "../../../model/member";
import {MemberService} from "../../../service/member.service";
import {Weight} from "../../../model/weight";

export interface weightData {
  created: string;
  weightValue: number;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    BaseChartDirective,
    MatFormField,
    MatInput,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect, MatButton,
  ],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  themeService: ThemeService = inject(ThemeService);
  @Input() fullMemberResponse?: FullMemberResponse;
  myForm!: FormGroup;

  public lineChartOptions: ChartOptions<'line'> = {responsive: true};
  public lineChartLegend = true;
  displayedColumns: string[] = ['created', 'weightValue'];
  dataSource: weightData[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Weight',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(65,64,64,0.3)'
      }
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      created: ['', [Validators.required, Validators.minLength(3),]],
      weightValue: ['', [Validators.required, Validators.minLength(3),]]
    });

    setTimeout(() => {
      this.initTable();
    }, 250);

  }

  initTable() {
    const tableData: weightData[] = [];
    if (this.fullMemberResponse?.weights) {
      this.fullMemberResponse.weights.forEach(weight => {
        tableData.push({
          created: weight.created ?? '',
          weightValue: weight.weightValue ?? 0
        });
      });

      this.dataSource = tableData;
      this.updateChartData(tableData);
    }
  }

  updateChartData(tableData: weightData[]) {
    const reversedData = tableData.slice().reverse();

    const labels = reversedData.map(data => data.created);
    const data = reversedData.map(data => data.weightValue);

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Weight',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(65,64,64,0.3)',
        }
      ]
    };
  }

  save() {
    if (this.myForm.valid) {
      const weight: Weight = {
        id: this.fullMemberResponse?.id,
        created: this.myForm.get('created')?.value,
        weightValue: this.myForm.get('weightValue')?.value,
      };

      this.memberService.saveWeight(weight).subscribe(
        (response) => {
        console.log(response)
        }
      );

    }
  }
}
