import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPageComponent } from './form-page/form-page.component';
import { PrintFormComponent } from './print-form/print-form.component';
import { ReportHistoryComponent } from './report-history/report-history.component';
import { VehicleUploadComponent } from './vehicle-upload/vehicle-upload.component';


const routes: Routes = [{path:'',component:FormPageComponent, pathMatch:'full'},
                        {path:'travel',component:FormPageComponent},
                        {path:'vehicle',component:VehicleUploadComponent},
                        {path:'printForm',component:PrintFormComponent},
                        {path:'history',component:ReportHistoryComponent},
                        {path:'**', redirectTo:''}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
