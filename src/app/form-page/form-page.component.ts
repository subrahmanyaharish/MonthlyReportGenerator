import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Report } from './../Models/report';
import { Vehicle } from './../vehicle-upload/vehicle';
import { ReportServiceService } from './../report-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { map, findIndex } from 'rxjs/operators';



@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  reportForm: FormGroup;
  vehicles: Vehicle[] = [];

  constructor(private fb: FormBuilder,
              private service: ReportServiceService,
              private route: Router) { }

  ngOnInit() {

    this.getAllVehicles();

    this.reportForm = this.fb.group({
      travelDetails: this.fb.group({
        from        : [''],
        to          : [''],
        driverName  : [''],
        petrol      : [''],
        openingReading         : [''],
        endReading         : ['']
      }),
      customerDetails: this.fb.group({
        name        : [''],
        mobile      : [''],
        paid        : [''],
        advance     : ['']
      }),
      vehicleDetails: this.fb.group({
        vehicleNumber : [''],
        travelCost    : ['']
      })


    });
  }

  getAllVehicles(){
    this.service.getAllVehicles().pipe(map(responseData=>{
      const vehiclesArray = [];
      // tslint:disable-next-line: forin
      for (const key in responseData) {
        vehiclesArray.push({ ...responseData[key], id: key});
      }
      return vehiclesArray;
    })).subscribe(
      data=>{this.vehicles = data; console.log(data)}
    )
  }
  onSubmit() {


    const reportObj = new Report(
      this.reportForm.value.travelDetails.from,
      this.reportForm.value.travelDetails.to,
      this.reportForm.value.travelDetails.driverName,
      this.reportForm.value.travelDetails.petrol,
      this.reportForm.value.customerDetails.name,
      this.reportForm.value.customerDetails.mobile,
      this.reportForm.value.customerDetails.paid,
      this.reportForm.value.customerDetails.advance,
      this.reportForm.value.vehicleDetails.vehicleNumber.vehicle,
      this.reportForm.value.vehicleDetails.travelCost,
      uuidv4(),
      new Date(),
      this.reportForm.value.travelDetails.openingReading,
      this.reportForm.value.travelDetails.endReading
    );
    this.service.storeToDB(reportObj);
    this.route.navigate(['/printForm']);
    console.log(reportObj)

  }


}
