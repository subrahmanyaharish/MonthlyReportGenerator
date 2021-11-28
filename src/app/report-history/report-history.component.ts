import { Component, OnInit } from '@angular/core';
import { Report } from '../Models/report';
import { HistoryService } from './../services/history.service';
import { map, findIndex } from 'rxjs/operators';
import { ReportServiceService } from './../report-service.service';
import { NgForm } from '@angular/forms';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';



@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})
export class ReportHistoryComponent implements OnInit {

  reports: Report[] = [];
  duplicateReports: Report[] = [];
  totalAmount = 0;

  constructor(private history: HistoryService,
              private reportService: ReportServiceService,
              private router: Router) { }

  ngOnInit() {
    this.history.getAllReports().pipe(map(responseData=>{
      const reportsArray = [];
      // tslint:disable-next-line: forin
      for (const key in responseData) {
        reportsArray.push({ ...responseData[key], id: key});
      }
      return reportsArray;
    })).subscribe(
      data => {this.reports = data, this.duplicateReports = data
        this.calculateTotalAmount();
      }
    )
  }

  update(report: Report) {
    this.reportService.reportToBeUpdated = report;
    this.router.navigate(['/travel']);
  }

  fromToDate(dateForm: NgForm){
    let tempReports: Report[] = [];
    this.reports = this.duplicateReports;
    tempReports = this.reports.filter(value => {
      const reportFromDate = new Date(value.invoiceDate);
      reportFromDate.setHours(0, 0, 0);
      return (reportFromDate >=  dateForm.value.fromDate && reportFromDate  <= dateForm.value.toDate);
    });
    this.reports = tempReports;
    this.calculateTotalAmount();
    dateForm.resetForm();
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    this.reports.forEach((value) => {
    this.totalAmount = (+value.overAllCost) + this.totalAmount;
    } );
  }

  public print()
  {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      var pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(`Report.pdf`); // Generated PDF
    });  }

}
