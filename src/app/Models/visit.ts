// export class Visit {
//   timeIn: {
//     hour: number;
//     minute: number;
//   } = { hour: 0, minute: 0 };

//   timeOut: {
//     hour: number;
//     minute: number;
//   } = { hour: 0, minute: 0 };

//   assingedEngineerId: string = "";
//   technicalRemarks: string = "";
//   totalDistance: number = 0;
// }

export class Visit {
  id!:string;
  visitDate!:string;
  timeIn!: string;
  timeOut!: string;
  assingedEngineerId: string = '';
  technicalRemarks: string = '';
  totalDistance!: number;
}
