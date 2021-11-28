import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Report } from './Models/report';
import { Vehicle } from './vehicle-upload/vehicle';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  vehiclesChanged = new Subject<Vehicle[]>();

  vehicles: Vehicle[] = [];

  urlVehicles = 'https://monthly-report-generator-34674-default-rtdb.asia-southeast1.firebasedatabase.app/vehicles.json';

  urlDeleteVehicles = 'https://monthly-report-generator-34674-default-rtdb.asia-southeast1.firebasedatabase.app/vehicles';


  tempUrlVehicles = 'http://localhost:3000/vehicles'

  public reports: Report[] = [];

  public reportToBePrinted: Report;

  constructor(private http: HttpClient) { }

  storeToDB(report: Report){
    this.reports.push(report);
    this.reportToBePrinted = report;
  }

  storeVehicles(vehicle: string): Observable<string>{
    let body = {vehicle}

    return this.http.post<string>(this.urlVehicles, body);
  }

  getAllVehicles(){
    return this.http.get<Vehicle[]>(this.urlVehicles)
  }

  deleteVehicles(vehicleId: number){
    return this.http.delete<number>(`${this.urlDeleteVehicles}/${vehicleId}.json`);
  }
}
