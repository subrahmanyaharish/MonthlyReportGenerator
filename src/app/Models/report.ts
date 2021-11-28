export class Report {
  constructor(public from      : string,
              public to        : string,
              public driverName: string,
              public petrol    : string,
              public name      : string,
              public mobile    : string,
              public paid      : string,
              public advance   : number,
              public vehicleNumber     : string,
              public travelCost        : number,
              public invoiceNumber: string,
              public invoiceDate: Date,
              public openReading   : string,
              public endReading   : string
              ) {}
}
