import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class AddIncomeComponent {
  title = '';
  amount: number | null = null;
  note = '';

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveIncome() {
    if (this.title && this.amount) {
      this.modalCtrl.dismiss({ title: this.title, amount: this.amount, note: this.note });
    }
  }
}
