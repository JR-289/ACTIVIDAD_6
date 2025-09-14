import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, } from '@angular/router';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private router = inject(Router);

  loading = false;
  createdId: string | number | null = null; // la API devuelve id ficticio (string o number)

  userForm: FormGroup = this.fb.group({
    first_name: ['', Validators.required],                // Nombre de Usuario
    last_name: ['', Validators.required],                 // Apellido
    email: ['', [Validators.required, Validators.email]], // Email
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]] // URL imagen
  });

  async onSubmit() {
    if (this.userForm.invalid || this.loading) return;

    this.loading = true;
    this.createdId = null;

    try {
      const payload = this.userForm.value;
      // POST -> la API simula la inserción y devuelve un id ficticio
      const resp = await this.usersService.createUser(payload);
      // la respuesta puede traer id o _id según el backend de pruebas
      this.createdId = (resp as any)._id ?? (resp as any).id ?? null;

      // Opcional: redirigir al home o al detalle si procediera
      // this.router.navigate(['/home']);
    } catch (e) {
      console.error('Error creando usuario', e);
      // aquí puedes mostrar un toast/alert si usas SweetAlert2/Toastr
    } finally {
      this.loading = false;
    }
  }

  // Helpers para mostrar errores SIN *ngIf (usamos [hidden])
  isInvalid(name: string): boolean {
    const c = this.userForm.get(name);
    return !!c && c.touched && c.invalid;
  }
}