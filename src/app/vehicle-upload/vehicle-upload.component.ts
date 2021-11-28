import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ReportServiceService } from './../report-service.service';
import { Vehicle } from './vehicle';
import { map, findIndex } from 'rxjs/operators';


@Component({
  selector: 'app-vehicle-upload',
  templateUrl: './vehicle-upload.component.html',
  styleUrls: ['./vehicle-upload.component.css']
})
export class VehicleUploadComponent implements OnInit {

  vehicle: string;
  vehicleForm: FormGroup;
  vehicles: Vehicle[] = [];

  constructor(private fb: FormBuilder,
              private reportService: ReportServiceService) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      vehicle: ['',Validators.required]
    });
    this.getAllVehicles();
  }

  uploadVehicle(){
    this.reportService.storeVehicles(this.vehicleForm.value.vehicle).subscribe(
      data=>{},
      error=>{},
      ()=>{
        this.getAllVehicles();
      }
    );
  }

  getAllVehicles(){
    this.reportService.getAllVehicles().pipe(map(responseData=>{
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

  deleteVehicle(vehicle: Vehicle){
    this.reportService.deleteVehicles(vehicle.id).subscribe(
      data=>{},
      error=>{},
      ()=>{ this.getAllVehicles();}
    );
  }

}
