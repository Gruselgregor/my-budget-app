import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service'
import { IonicModule, ModalController } from '@ionic/angular';
import { AddIncomeComponent } from 'src/app/dialogs/add-income/add-income.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  incomes: any[] = [];

  constructor(private dbService: DatabaseService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    await this.dbService.initDB();
    console.log(this.incomes)
    this.incomes = await this.dbService.getIncomes();
  }

  async openAddIncomeDialog() {
    const modal = await this.modalCtrl.create({
      component: AddIncomeComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        await this.dbService.addIncome(result.data.title, result.data.amount, result.data.note);
        this.incomes = await this.dbService.getIncomes();
      }
    });

    await modal.present();
  }
}
