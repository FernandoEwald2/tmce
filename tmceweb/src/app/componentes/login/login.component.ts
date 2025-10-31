import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth.service';
import { Global } from 'src/app/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  usuarioLogado: any;
  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    private global: Global,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.global.deleteTokenUsuario();
    this.global.deleteUsuarioLogado();
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      const request = {
        login: username,
        senha: this.global.gerarMD5(password),
      };

      this.apiService.post<any>('Usuario/login', request).subscribe({
        next: (response) => {
          this.global.setTokenUsuario(response.access_token);
          this.usuarioLogado = {
            id: response.usuario_id,
            usuario: response.usuario_nome,
          };
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Login inválido',
            text: err.message,
          });
        },
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
