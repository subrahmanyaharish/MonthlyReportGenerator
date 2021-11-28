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
  toBeUpdated = false;
  reportToBeUpdated: Report;

  constructor(private fb: FormBuilder,
              private service: ReportServiceService,
              private route: Router) { }

  ngOnInit() {

    this.getAllVehicles();
    this.reportToBeUpdated = this.service.reportToBeUpdated;

    if(this.reportToBeUpdated!=null){
      this.toBeUpdated = true;
      this.reportForm = this.fb.group({
        travelDetails: this.fb.group({
          from        : [ this.reportToBeUpdated.from],
          to          : [this.reportToBeUpdated.to],
          driverName  : [this.reportToBeUpdated.driverName],
          petrol      : [this.reportToBeUpdated.petrol],
          openingReading         : [this.reportToBeUpdated.openReading],
          endReading         : [this.reportToBeUpdated.endReading],
          totalReading         : [this.reportToBeUpdated.totalReading],
          driverNumber    : [this.reportToBeUpdated.driverNumber],
          costPerKm       : [this.reportToBeUpdated.costPerKm],
          parkingCharge   : [this.reportToBeUpdated.parkingCharge],
          toll            : [this.reportToBeUpdated.toll],
          invoiceDate     : [this.reportToBeUpdated.invoiceDate]
        }),
        customerDetails: this.fb.group({
          name        : [this.reportToBeUpdated.name],
          mobile      : [this.reportToBeUpdated.mobile],
          paid        : [this.reportToBeUpdated.paid],
          advance     : [this.reportToBeUpdated.advance]
        }),
        vehicleDetails: this.fb.group({
          vehicleNumber : [this.reportToBeUpdated.vehicleNumber],
          travelCost    : [this.reportToBeUpdated.travelCost],
          driverBeta  :[this.reportToBeUpdated.driverBeta]
        })


      });
    }
    else{
      this.reportForm = this.fb.group({
        travelDetails: this.fb.group({
          from        : [''],
          to          : [''],
          driverName  : [''],
          petrol      : [''],
          openingReading         : [],
          endReading         : [],
          totalReading         : [],
          driverNumber    : [''],
          costPerKm       : [],
          parkingCharge   : [],
          toll            : [],
          invoiceDate     : []
        }),
        customerDetails: this.fb.group({
          name        : [''],
          mobile      : [''],
          paid        : [''],
          advance     : ['']
        }),
        vehicleDetails: this.fb.group({
          vehicleNumber : [''],
          travelCost    : [],
          driverBeta  :[]
        })


      });
    }


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
      data=>{this.vehicles = data; }
    )
  }
  onSubmit() {

    if(this.toBeUpdated){
      this.onUpdate()
    } else {

    let totalCost = this.reportForm.value.travelDetails.costPerKm*
                    this.reportForm.value.travelDetails.totalReading+
                    this.reportForm.value.vehicleDetails.driverBeta+
                    this.reportForm.value.travelDetails.parkingCharge+
                    this.reportForm.value.travelDetails.toll

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
      this.reportForm.value.travelDetails.invoiceDate,
      this.reportForm.value.travelDetails.openingReading,
      this.reportForm.value.travelDetails.endReading,
      this.reportForm.value.travelDetails.driverNumber,
      this.reportForm.value.travelDetails.costPerKm,
      this.reportForm.value.travelDetails.parkingCharge,
      this.reportForm.value.travelDetails.toll,
      this.reportForm.value.travelDetails.totalReading,
      this.reportForm.value.vehicleDetails.driverBeta,
      totalCost
    );
    this.service.storeToDB(reportObj).subscribe(
      data=>{},
      error => {},
      () => {}
    );
    this.route.navigate(['/printForm']);
    }
  }

  OnReadingChange(){
    const read = this.reportForm.value.travelDetails.endReading-this.reportForm.value.travelDetails.openingReading
    this.reportForm.patchValue({
      travelDetails: {
            totalReading            : read
      }})
  }

  OnTravelCostChange(){
    const read = this.reportForm.value.travelDetails.costPerKm*this.reportForm.value.travelDetails.totalReading;
    this.reportForm.patchValue({
      vehicleDetails: {
        travelCost            : read
      }})
  }

  onUpdate() {

    let totalCost = this.reportForm.value.travelDetails.costPerKm*
                    this.reportForm.value.travelDetails.totalReading+
                    this.reportForm.value.vehicleDetails.driverBeta+
                    this.reportForm.value.travelDetails.parkingCharge+
                    this.reportForm.value.travelDetails.toll

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
      this.reportToBeUpdated.invoiceNumber,
      this.reportForm.value.travelDetails.invoiceDate,
      this.reportForm.value.travelDetails.openingReading,
      this.reportForm.value.travelDetails.endReading,
      this.reportForm.value.travelDetails.driverNumber,
      this.reportForm.value.travelDetails.costPerKm,
      this.reportForm.value.travelDetails.parkingCharge,
      this.reportForm.value.travelDetails.toll,
      this.reportForm.value.travelDetails.totalReading,
      this.reportForm.value.vehicleDetails.driverBeta,
      totalCost,
      this.reportToBeUpdated.id
    );
    this.service.updateReport(reportObj).subscribe(
      data=>{},
      error => {},
      () => {}
    );
    this.reportToBeUpdated = null;
    this.route.navigate(['/printForm']);
    this.toBeUpdated = false;

  }


}
