import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarsData } from '../interfaces/cars-data';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  getAllCars() {
    return this.httpClient.get("http://localhost:3000/cars", { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  addCar(car: CarsData) {
    return this.httpClient.post("http://localhost:3000/car", car);
  }
}
