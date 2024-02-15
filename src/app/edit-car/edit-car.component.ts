import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CarService } from '../services/car.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarsData } from '../interfaces/cars-data';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent {
  editCar() {
    return this.carService.editCar(this.newCar.value).subscribe((data: any) => {
      const newCarData = this.newCar.value;
      const { model, quantity, changeQuantityPercent } = newCarData;

      let message = '';
      if (data.rank === null || data.rank === undefined) {
        message = `Failed to edit car:\n\tModel: ${model}\n\tQuantity: ${quantity}\n\tChange Quantity Percent: ${changeQuantityPercent}\n`;
      }
      else {
        message = `Edited car at rank ${data.rank}:\n\tModel: ${model}\n\tQuantity: ${quantity}\n\tChange Quantity Percent: ${changeQuantityPercent}\n`;
      }
      this.snackBar.open(message, 'Close', { duration: 2000, panelClass: ['snackbar-add-car'] });

      this.newCar.reset();

      this.editCarDialog.close();
    }).unsubscribe();
  }

  newCar: FormGroup = new FormGroup({
    model: new FormControl(this.car.model, [Validators.required]),
    quantity: new FormControl(this.car.quantity, [Validators.required]),
    changeQuantityPercent: new FormControl(this.car.changeQuantityPercent, [Validators.required]),
  });

  onNoClick(): void {
    this.editCarDialog.close();
  }

  constructor(private carService: CarService, private snackBar: MatSnackBar, public editCarDialog: MatDialogRef<EditCarComponent>, @Inject(MAT_DIALOG_DATA) public car: CarsData) { }
}
