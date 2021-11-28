import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../Models/report';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  urlReports = 'https://monthly-report-generator-34674-default-rtdb.asia-southeast1.firebasedatabase.app/reports.json';

  constructor(private http: HttpClient) { }

  getAllReports() {
    return this.http.get<Report[]>(this.urlReports);
  }


}
