import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedInfo: any = null;

  infoData: { [key: string]: { title: string; description: string } } = {
    payments: { title: 'Payments', description: 'Información sobre pagos...' },
    billings: { title: 'Billings', description: 'Información sobre transacciones...' },
    users: { title: 'Users', description: 'Información sobre usuarios...' }
  };

  showInfo(section: keyof typeof this.infoData) {
    this.selectedInfo = this.infoData[section];
  }
}
