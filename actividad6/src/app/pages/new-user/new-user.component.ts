import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})

export class NewUserComponent {

  userForm: FormGroup;
  userService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);
 
  user: IUser | null = null;
  userId: string | null = null;

  title: string = 'Registrar'

  constructor(){
    this.userForm = new FormGroup({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      image: new FormControl("", [Validators.required, Validators.pattern(/^https?:\/\/.+/i)])
    });
  }

  async ngOnInit() {

    this.route.params.subscribe(async (params) => {
    this.userId = params['_id'] ?? null;

      if (this.userId) {
        try {
          this.user = await this.userService.getById(this.userId);
          this.title  = 'Editar'
          this.userForm.patchValue(this.user);
          // this.userForm = new FormGroup({
          // first_name: new FormControl(this.user?.first_name || "", [Validators.required]),
          // last_name: new FormControl(this.user?.last_name || "", [Validators.required]),
          // email: new FormControl(this.user?.email || "", [Validators.required, Validators.email]),
          // image: new FormControl(this.user?.image || "", [Validators.required, Validators.pattern(/^https?:\/\/.+/i)])
          // })
          
          

        } catch (error) {
          toast.error("Error cargando usuario");
        }
      
    }
    ;
  })
}

  goBack() {
    this.router.navigate(['/dashboard']);
  }
  
  async getDataForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      toast.error("Error creando usuario");
      return
    }

    try {
      if (this.userId) {
        
        const response = await this.userService.updateUser(this.userForm.value);
        if (response) {
          this.router.navigate(['/dashboard']);
          toast.success("Usuario actualizado correctamente.");
          
        }
      } else {
        
        const response = await this.userService.createUser(this.userForm.value);
        
        if (response) {
          
          toast.success("Usuario creado correctamente con ID: " + response.id);
          this.router.navigate(['/dashboard']);
          
        }
      
      }
    } catch (err) {
      toast.error("No se ha podido encontrar el usuario.");
    }
  }
}

