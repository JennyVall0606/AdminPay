import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: AppUser[] = [];
  newUserForm: FormGroup;
  formInvalid = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.newUserForm = this.fb.group({ 
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
        this.toastr.error('Error al cargar usuarios', 'Error');
      }
    );
  }
  get firstname() {
    return this.newUserForm.get('firstname');
  }

  get lastname() {
    return this.newUserForm.get('lastname');
  }

  get email() {
    return this.newUserForm.get('email');
  }

  get password() {
    return this.newUserForm.get('password');
  }

  onSubmit(): void {
    if (this.newUserForm.valid) {
      this.userService.register(this.newUserForm.value).subscribe({
        next: () => {
          this.getUsers(); 
          this.newUserForm.reset(); 
          this.formInvalid = false;
        },
        error: (error) => {
          console.error('Error creating user:', error);
          
        }
      });
    } else {
      this.formInvalid = true;
    }
  }
  deleteUser(userId?: string): void {
    if (!userId) {
      return;
    }
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.toastr.success('El usuario fue eliminado con éxito!', 'Usuario eliminado');
          this.getUsers(); 
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
          this.toastr.error('Error al eliminar usuario', 'Error');
        }
      );
    }
  }
}