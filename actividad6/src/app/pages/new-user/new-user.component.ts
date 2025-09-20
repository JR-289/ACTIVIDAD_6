import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { first } from 'rxjs';
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

  constructor(){
    this.userForm = new FormGroup({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      image: new FormControl("", [Validators.required, Validators.pattern(/^https?:\/\/.+/i)])
    });
  }

  async ngOnInit() {
    // 👇 Nos suscribimos a los parámetros de la ruta
    this.route.params.subscribe(async (params) => {
      this.userId = params['_id'] ?? null;

      if (this.userId) {
        try {
          this.user = await this.userService.getById(this.userId);
          // ✅ precargamos valores en el form
          this.userForm.patchValue(this.user);
        } catch (error) {
          toast.error("Error cargando usuario");
        }
      }
    });
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
        // ✅ actualizar
        const response = await this.userService.updateUser(this.userForm.value);
        if (response) {
          this.router.navigate(['/dashboard']);
          toast.success("Usuario actualizado correctamente.");
          
        }
      } else {
        // ✅ crear
        const response = await this.userService.createUser(this.userForm.value);
        
        if (response) {
          // alert("Usuario creado con el ID: " + response.id)
          toast.success("Usuario creado correctamente con ID: " + response.id);
          this.router.navigate(['/dashboard']);
          
        }
      
      }
    } catch (err) {
      toast.error("No se ha podido encontrar el usuario.");
    }
  }
}


// export class NewUserComponent {


//   userForm: FormGroup
//   userService = inject(UsersService);
//   router = inject(Router)
//   @Input() idUser: string | null = null;
//   user: IUser | null = null;


//   constructor(){
//     this.userForm = new FormGroup({
//       first_name: new FormControl("", []),
//       last_name: new FormControl("", []),
//       email: new FormControl("", []),
//       image: new FormControl("", [])
//     });
//   }


// async ngOnInit() {

//   if(this.idUser){
//     this.user = await this.userService.getById(this.idUser)

//     this.userForm = new FormGroup({
//       _id: new FormControl(this.user._id, []),
//       first_name: new FormControl(this.user.first_name, [Validators.required]),
//       last_name: new FormControl(this.user.last_name, [Validators.required]),
//       email: new FormControl(this.user.email, [Validators.required, Validators.email]),
//       image: new FormControl(this.user.image, [Validators.required, Validators.pattern(/^https?:\/\/.+/i)])
//     });
//   }
    
// } 
// goBack() {
//     this.router.navigate(['/dashboard']);
//   }
  
// async getDataForm () {
//   try {
//     if (this.userForm.value._id) {
//       const response = await this.userService.updateUser(this.userForm.value);
//       if (response) {
//         this.router.navigate(['/dashboard']);
//         toast.warning("Usuario actualizado correctamente.")
//       }
//     } else {
//       const response = await this.userService.createUser(this.userForm.value)
//       if (response) {
//         this.router.navigate(['/dashboard']);
//         toast.success("Usuario creado correctamente.")
//       }
//     }
//   } catch (msh: any){
//     toast.error("error creando/actualizando usuario")
//   }


//   }



// }
  // private fb = inject(FormBuilder);
  // private usersService = inject(UsersService);
  // private router = inject(Router);

  // loading = false;
  // createdId: string | number | null = null; // la API devuelve id ficticio (string o number)

  // userForm: FormGroup = this.fb.group({
  //   first_name: ['', Validators.required],                // Nombre de Usuario
  //   last_name: ['', Validators.required],                 // Apellido
  //   email: ['', [Validators.required, Validators.email]], // Email
  //   image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]] // URL imagen
  // });

  // async getDataForm () {
  //   if (this.userForm.invalid || this.loading) return;

  //   this.loading = true;
  //   this.createdId = null;

  //   try {
  //     const payload = this.userForm.value;
  //     // POST -> la API simula la inserción y devuelve un id ficticio
  //     const resp = await this.usersService.createUser(payload);
  //     // la respuesta puede traer id o _id según el backend de pruebas
  //     this.createdId = (resp as any)._id ?? (resp as any).id ?? null;

  //     // Opcional: redirigir al home o al detalle si procediera
  //     // this.router.navigate(['/home']);
  //   } catch (e) {
  //     console.error('Error creando usuario', e);
  //     // aquí puedes mostrar un toast/alert si usas SweetAlert2/Toastr
  //   } finally {
  //     this.loading = false;
  //   }
  // }

  // // Helpers para mostrar errores SIN *ngIf (usamos [hidden])
  // isInvalid(name: string): boolean {
  //   const c = this.userForm.get(name);
  //   return !!c && c.touched && c.invalid;
  // }

  // goBack() {
  //   this.router.navigate(['/dashboard']);
  // }

