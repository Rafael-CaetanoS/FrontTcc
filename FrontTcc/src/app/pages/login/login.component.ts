import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; // Importação do SweetAlert2
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoginService } from '../../services/login.service';
import { error } from 'node:console';
import { TmplAstSwitchBlockCase } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  erroCadastro: string | null = null;

  constructor(private formBuilder: FormBuilder, private service: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.service.autenticar()){
      this.router.navigate(['/Inicio']); 
    }
  }

  logar() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.erroCadastro = null;


    this.service.login(this.loginForm.value.email, this.loginForm.value.senha).subscribe({
      next: () => {
        this.router.navigate(['/Inicio']); // Redireciona para a página inicial
      },
      error: (error) => {

        if(error.status === 400 && error.error?.message === 'e-mail inválido'){
          this.erroCadastro = "E-mail inválido.";
        }
        Swal.fire({
          icon: 'error',
          title: 'Erro no login',
          text: 'E-mail ou senha inválidos. Tente novamente.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  /*logout() {
    localStorage.removeItem('nomeAtleta');
    localStorage.removeItem('idAtleta');
    this.router.navigate(['/login']); // Redireciona para a página de login
  }*/
}
