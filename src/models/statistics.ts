export interface Statistics {
   employee_id: string,
   date: Date,
   conocimiento: {[s: string]: number}[];
   saberHacer: {[s:string]: number}[];
   saberEstar: {[s:string]: number}[];
}