import { Component, OnInit } from '@angular/core';
import { Report } from '../Models/report';
import { ReportServiceService } from '../report-service.service';
import { jsPDF } from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-form',
  templateUrl: './print-form.component.html',
  styleUrls: ['./print-form.component.css']
})
export class PrintFormComponent implements OnInit {

  reportToBePrinted: Report;
  totalAmount: number;

  constructor(private service: ReportServiceService) { }

  ngOnInit() {
    this.reportToBePrinted = this.service.reportToBePrinted;
    this.totalAmount = this.reportToBePrinted.travelCost - this.reportToBePrinted.advance +  this.reportToBePrinted.parkingCharge + this.reportToBePrinted.toll + this.reportToBePrinted.driverBeta
  }

  print(){
    window.print();
  }

  printToCart(printSectionId: string){
    let popupWinindow
    let innerContents = document.getElementById(printSectionId).innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }

  public captureScreen()
  {
    debugger
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
      pdf.save(`${this.reportToBePrinted.invoiceNumber}2021.pdf`); // Generated PDF
    });  }

}
