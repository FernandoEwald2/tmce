import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    private global: Global,
    private router: Router,
    private authService: AuthService
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

      // armazenar o token antes de redirecionar

      this.global.setTokenUsuario('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjExMCIsInRva2VuIjoiN0RGMjM1RTNCRjJGNDVDNzkyMTNDOUM3NTA5QjM4MkIiLCJydWxlIjoiQmVhcmVyIiwidHlwZSI6IjEiLCJuYmYiOjE3NTY5MDc3MjIsImV4cCI6MTc1NjkyMjEyMiwiaWF0IjoxNzU2OTA3NzIyLCJpc3MiOiJJc3N1ZXIifQ.68EVsxHAWz92JnY422VKttrDX_HF-78KTtcc_7PsQjo');

      const tokenValido = this.authService.isTokenValid();

      if(!tokenValido){

        Swal.fire({
          icon: 'error',
          title: 'Lofin inválido',
          text: 'Por favor, faça login novamente.',
        });
        this.authService.logout();
        return;
      }
       

      this.router.navigateByUrl('/home');
      //this.router.navigate(['/home']);
      // Implementar lógica de autenticação aqui
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
