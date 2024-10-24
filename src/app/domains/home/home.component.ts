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
  selectedPayment: any[] = []; 

  language: 'en' | 'es' = 'es'; 
  
  loggedInUserId: string = '51fc';

  profile = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
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
   
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(data => {
      this.users = data;
      this.loadUserProfile();
    });

    this.http.get<any[]>('http://localhost:3000/payments').subscribe(data => {
      this.payments = data;
    });

    this.http.get<any[]>('http://localhost:3000/billings').subscribe(data => {
      this.billings = data;
    });
  }

  loadUserProfile() {
    const user = this.users.find(u => u.id === this.loggedInUserId);
    if (user) {
      this.profile = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthday: user.birthday,
        address: user.address,
        city: user.city || '',  // Puedes agregar más campos si es necesario
        postalCode: user.postalCode || '',
        country: user.country || '',
        phone: user.phone || ''
      };
    }
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
      this.selectedPayment = []; 
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
  
    if (method === 1) {
      this.selectedPayment = this.payments.filter(payment => payment.method === 'method1');
    } else if (method === 2) {
      this.selectedPayment = this.payments.filter(payment => payment.method === 'method2');
    } else if (method === 3) {
      this.selectedPayment = this.payments.filter(payment => payment.method === 'method3');
    }

    
    if (this.selectedPayment.length > 0) {
      this.selectedInfo = {
        title: this.translations[this.language].payments,
        description: '', 
      };
    } else {
      
      this.selectedInfo = null;
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      
      console.log('File selected:', file);
    }
  }

  saveChanges() {
    const url = `http://localhost:3000/users/${this.profile.id}`; // URL para actualizar el usuario

    // Usar el método PATCH para simular la actualización parcial del perfil
    this.http.patch(url, this.profile).subscribe(response => {
      console.log('Perfil actualizado:', response);
      alert('Los cambios se han guardado exitosamente.');
    }, error => {
      console.error('Error al guardar los cambios:', error);
      alert('Ocurrió un error al guardar los cambios.');
    });
  }
}
  
  
