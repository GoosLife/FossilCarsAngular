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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { EditCarComponent } from '../edit-car/edit-car.component';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  carTypes: any = [
    { value: 'electric', viewValue: 'Elektrisk' },
    { value: 'fossil', viewValue: 'Fossil' },
  ];

  addCar() {
    this.carService.addCar(this.newCar.value).pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      this.getCarsByType(this.currentType);

      const newCarData = this.newCar.value;
      const { type, model, quantity, changeQuantityPercent } = newCarData;

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
    this.carService.getAllCars().pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      return data;
    });
  }

  getCarsByType(type: string | null) {
    this.currentType = type;

    if (type == null) {
      this.getCars();
    }
    else {
      this.carService.getAllCarsByType(type).pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        return data;
      });
    }
  }

  openEditDialog(car: any) {
    const dialogRef = this.dialog.open(EditCarComponent, {
      width: '33%',
      data: car
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.getCars();
    });
  }

  editCar(car: any) {
    this.carService.editCar(car).pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      this.getCars();
      this.snackBar.open(`Edited car:\n\tModel: ${data.model}\n\tQuantity: ${data.quantity}\n\tChange Quantity Percent: ${data.changeQuantityPercent}\n`, 'Close', { duration: 2000, panelClass: ['snackbar-add-car'] });
    });
  }

  deleteCar(car: any) {
    this.carService.deleteCar(car.id).pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      this.snackBar.open(`Deleted car:\n\tModel: ${car.model}\n\tQuantity: ${car.quantity}\n\tChange Quantity Percent: ${car.changeQuantityPercent}\n`, 'Close', { duration: 2000, panelClass: ['snackbar-add-car'] });
      this.getCars();
    });
  }

  ngOnInit(): void {
    this.getCars();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  newCar: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    changeQuantityPercent: new FormControl('', [Validators.required]),
  });

  currentType: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  dataSource = new MatTableDataSource<CarsData>();
  displayedColumns: string[] = ['rank', 'model', 'quantity', 'changeQuantityPercent', 'actions'];

  private unsubscribe$: Subject<void> = new Subject();
  constructor(private snackBar: MatSnackBar, private carService: CarService, private dialog: MatDialog) { }
}
