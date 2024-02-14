import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CarsData } from '../interfaces/cars-data';
import { CarService } from '../services/car.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-car',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {

  addCar() {
    this.carService.addCar(this.newCar.value).subscribe((data: any) => {
      this.getCars();

      const newCarData = this.newCar.value;
      const { model, quantity, changeQuantityPercent } = newCarData;

      let message = '';
      if (data.rank === null || data.rank === undefined) {
        message = `Failed to add new car:\n\tModel: ${model}\n\tQuantity: ${quantity}\n\tChange Quantity Percent: ${changeQuantityPercent}\n`;
      }
      else {
        message = `Added new car at rank ${data.rank}:\n\tModel: ${model}\n\tQuantity: ${quantity}\n\tChange Quantity Percent: ${changeQuantityPercent}\n`;
      }
      this.snackBar.open(message, 'Close', { duration: 2000, panelClass: ['snackbar-add-car'] });

      this.newCar.reset();
    });
  }

  getCars() {
    this.carService.getAllCars().subscribe((data: any) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      return data;
    });
  }

  editCar(car: any) {

  }

  deleteCar(car: any) {

  }

  ngOnInit(): void {
    this.getCars();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  newCar: FormGroup = new FormGroup({
    model: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    changeQuantityPercent: new FormControl('', [Validators.required]),
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  dataSource = new MatTableDataSource<CarsData>();
  displayedColumns: string[] = ['rank', 'model', 'quantity', 'changeQuantityPercent', 'actions'];

  constructor(private snackBar: MatSnackBar, private carService: CarService) { }
}
