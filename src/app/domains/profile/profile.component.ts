import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileImage: string | ArrayBuffer | null = null; // Para mostrar la imagen seleccionada

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      password: [''],
      fechaNacimiento: [''],
      direccion: [''],
      ciudad: [''],
      codigoPostal: [''],
      pais: ['']
    });
  }

  ngOnInit(): void {
    // Cargar los datos del usuario
    this.profileForm.patchValue({
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      fechaNacimiento: '1990-01-01',
      direccion: 'Calle Falsa 123',
      ciudad: 'Bogotá',
      codigoPostal: '110111',
      pais: 'Colombia'
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Datos del perfil actualizados:', this.profileForm.value);
      
    }
  }
}
