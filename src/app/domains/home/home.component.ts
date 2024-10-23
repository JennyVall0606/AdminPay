import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedInfo: any;
  users: any[] = [];
  payments: any[] = [];
  billings: any[] = [];
  selectedPayment: any[] = []; // Para almacenar detalles del pago seleccionado

  language: 'en' | 'es' = 'es'; 
  

  profile = {
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };

  translations = {
    en: {
      payments: 'Payments',
      billings: 'Billings',
      users: 'Users',
      profile: 'Profile',
      id: 'ID',
      firstname: 'Firstname',
      lastname: 'Lastname',
      email: 'Email',
      amount: 'Amount',
      date: 'Date',
      status: 'Status',
      method: 'Payment Method',
      billingName: 'Billing Item',
      dueDate: 'Due Date',
      total: 'Total',
      profilePicture: 'Profile Picture',
      saveChanges: 'Save Changes',
      birthday: 'Birthday',        
      address: 'Address',         
      city: 'City',               
      postalCode: 'Postal Code',
      country: 'Country',
    },
    es: {
      payments: 'Pagos',
      billings: 'Transacciones',
      users: 'Usuarios',
      profile: 'Perfil',
      id: 'ID',
      firstname: 'Nombre',
      lastname: 'Apellido',
      email: 'Correo Electrónico',
      amount: 'Cantidad',
      date: 'Fecha',
      status: 'Estado',
      method: 'Método de Pago',
      billingName: 'Artículo de Factura',
      dueDate: 'Fecha de Vencimiento',
      total: 'Total',
      profilePicture: 'Foto de Perfil',
      saveChanges: 'Guardar Cambios',
      birthday: 'Fecha de Nacimiento', 
      address: 'Dirección',           
      city: 'Ciudad',                 
      postalCode: 'Código Postal',
      country: 'País',
    }
  };
  
  
  

  constructor(private http: HttpClient) {}

 

  ngOnInit() {
    this.fetchData();
    this.showInfo('profile');
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
    });

    this.http.get<any[]>('http://localhost:3000/payments').subscribe(data => {
      this.payments = data;
    });

    this.http.get<any[]>('http://localhost:3000/billings').subscribe(data => {
      this.billings = data;
    });
  }

  changeLanguage(lang: 'en' | 'es') {
    this.language = lang;
    this.showInfo('profile'); 
  }


  showInfo(section: string) {
    
    if (section === 'payments') {
      this.selectedInfo = {
        title: this.translations[this.language].payments,
        data: this.payments
      };
      this.selectedPayment = []; // Resetear detalles al cambiar de sección
    } else if (section === 'billings') {
      this.selectedInfo = {
        title: this.translations[this.language].billings,
        data: this.billings
      };
    } else if (section === 'users') {
      this.selectedInfo = {
        title: this.translations[this.language].users,
        data: this.users
      };
    } else if (section === 'profile') {
      this.selectedInfo = {
        title: this.translations[this.language].profile, 
        data: this.profile
      };
    }
  }
  
  showPaymentDetails(method: number) {
    // Filtrar pagos según el método seleccionado
    if (method === 1) {
      this.selectedPayment = this.payments.filter(payment => payment.method === 'method1');
    } else if (method === 2) {
      this.selectedPayment = this.payments.filter(payment => payment.method === 'method2');
    } else if (method === 3) {
      this.selectedPayment = this.payments.filter(payment => payment.method === 'method3');
    }

    // Solo mostrar la información de pagos si hay elementos seleccionados
    if (this.selectedPayment.length > 0) {
      this.selectedInfo = {
        title: this.translations[this.language].payments,
        description: '', // O cualquier otra descripción que desees
      };
    } else {
      // Si no hay pagos, se restablece la información seleccionada
      this.selectedInfo = null;
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Aquí puedes manejar la lógica para cargar o procesar la imagen
      console.log('File selected:', file);
    }
  }

  saveChanges() {
    // Aquí puedes implementar la lógica para guardar los cambios del perfil del usuario
    console.log('Changes saved for profile:', this.profile);
  }
  
  
}
