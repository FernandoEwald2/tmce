import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  carregandoCep = false;
  erroCep = '';
  buscaCep:string = '';
  listaUsuarios: any[] = []; // Lista para armazenar usuários

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      login: ['', [Validators.required, Validators.minLength(4)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // só números
      telefone: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      logradouro: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });

    this.usuarioForm.get('cep')?.valueChanges.subscribe(cepValue => {
    this.buscaCep = cepValue?.replace(/\D/g, '') || '';

    // Só dispara a busca se tiver 8 dígitos
    if (this.buscaCep.length === 8) {
      this.onCepBlur();
    }
  });
    
  }

  onCepBlur() {
    const cep = this.usuarioForm.get('cep')?.value;
    if (!cep || this.usuarioForm.get('cep')?.invalid) {
      return;
    }

    this.carregandoCep = true;
    this.erroCep = '';

    this.apiService.buscarCep(cep.replace(/\D/g, '')).subscribe({
      next: (data) => {
        this.carregandoCep = false;
        if (data.erro) {
          this.erroCep = 'CEP não encontrado.';
          this.limparEndereco();
          return;
        }

        // Preenche os campos do endereço
        this.usuarioForm.patchValue({
          logradouro: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        });
      },
      error: () => {
        this.carregandoCep = false;
        this.erroCep = 'Erro ao buscar o CEP.';
        this.limparEndereco();
      },
    });
  }

  limparEndereco() {
    this.usuarioForm.patchValue({
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
  }

  onSubmit() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();    
      return;
    }

    this.listaUsuarios.push(this.usuarioForm.value); 
    console.log(this.listaUsuarios);
    this.usuarioForm.reset();
      

    // Aqui você pode chamar sua API para salvar o usuário, ex:
    // this.apiService.post('usuarios', dados).subscribe(...)
  }
}
