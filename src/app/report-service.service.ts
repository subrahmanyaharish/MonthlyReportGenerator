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
  urlReports = 'https://monthly-report-generator-34674-default-rtdb.asia-southeast1.firebasedatabase.app/reports.json';
  tempUrlVehicles = 'http://localhost:3000/vehicles'
  urlUpdateReports = 'https://monthly-report-generator-34674-default-rtdb.asia-southeast1.firebasedatabase.app/reports';


  public reports: Report[] = [];
  public reportToBePrinted: Report;
  public reportToBeUpdated: Report = null;

  constructor(private http: HttpClient) { }

  updateReport(report: Report) {
    this.reportToBeUpdated = null;
    this.reportToBePrinted = report;
    return this.http.put<Report>(`${this.urlUpdateReports}/${report.id}/.json`, report);
  }

  storeToDB(report: Report){
    this.reports.push(report);
    this.reportToBePrinted = report;
    return this.http.post<Report>(this.urlReports, report);
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
