import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
})
export class ClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  buscaCep: string = '';
  carregandoCep = false;
  mobile: boolean = false;
  erroCep = '';
  listaClientes: any[] = []; // Lista para armazenar usuários
  tipoCliente = [
    { id: 1, value: 'Pessoa física' },
    { id: 2, value: 'Pessoa juridica' },
  ];
  mostrarCpf: boolean = false;
  mostrarCnpj: boolean = false;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    public global: Global,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: [''],
      cnpj: [''],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      tipoCliente: ['', Validators.required],
      logradouro: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });

    this.clienteForm.get('tipoCliente')?.valueChanges.subscribe((tipo) => {
      if (tipo === 'fisica') {
        this.clienteForm
          .get('cpf')
          ?.setValidators([
            Validators.required,
            Validators.pattern(/^\d{11}$/),
          ]);
        this.clienteForm.get('cnpj')?.clearValidators();
        this.clienteForm.get('cnpj')?.reset();
      } else if (tipo === 'juridica') {
        this.clienteForm
          .get('cnpj')
          ?.setValidators([
            Validators.required,
            Validators.pattern(/^\d{14}$/),
          ]);
        this.clienteForm.get('cpf')?.clearValidators();
        this.clienteForm.get('cpf')?.reset();
      }
      this.clienteForm.get('cpf')?.updateValueAndValidity();
      this.clienteForm.get('cnpj')?.updateValueAndValidity();
    });

    this.clienteForm.get('cep')?.valueChanges.subscribe((cepValue) => {
      this.buscaCep = cepValue?.replace(/\D/g, '') || '';

      // Só dispara a busca se tiver 8 dígitos
      if (this.buscaCep.length === 8) {
        this.onCepBlur();
      }
    });

    this.mobile = window.innerWidth <= 768;
  }

  onCepBlur() {
    const cep = this.clienteForm.get('cep')?.value;
    if (!cep || this.clienteForm.get('cep')?.invalid) {
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
        this.clienteForm.patchValue({
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
    this.clienteForm.patchValue({
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
  }
  onSubmit() {
    
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    this.listaClientes.push(this.clienteForm.value);
    this.clienteForm.reset();

    // Aqui você pode chamar sua API para salvar o usuário, ex:
    // this.apiService.post('usuarios', dados).subscribe(...)
  }
  removerCliente(usuario: any) {
    const index = this.listaClientes.indexOf(usuario);
    if (index > -1) {
      this.listaClientes.splice(index, 1);
    }
  }
  editarCliente(usuario: any) {
    this.clienteForm.patchValue(usuario);
    this.removerCliente(usuario);
  }

  //  valida para exibir o campo cpf ou cnpj conforme o tipo selecionado
  onTipoChange() {
    const tipo = this.clienteForm.get('tipoCliente')?.value;
    if (tipo === 1) {
      // Pessoa física
      this.mostrarCpf = true;
      this.mostrarCnpj = false;
      this.clienteForm
        .get('cpf')
        ?.setValidators([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]);
      this.clienteForm.get('cnpj')?.clearValidators();
      this.clienteForm.get('cnpj')?.setValue('');
    } else if (tipo === 2) {
      // Pessoa jurídica
      this.mostrarCpf = false;
      this.mostrarCnpj = true;
      this.clienteForm
        .get('cnpj')
        ?.setValidators([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ]);
      this.clienteForm.get('cpf')?.clearValidators();
      this.clienteForm.get('cpf')?.setValue('');
    } else {
      this.mostrarCpf = false;
      this.mostrarCnpj = false;
      this.clienteForm.get('cpf')?.clearValidators();
      this.clienteForm.get('cnpj')?.clearValidators();
    }

    this.clienteForm.get('cpf')?.updateValueAndValidity();
    this.clienteForm.get('cnpj')?.updateValueAndValidity();
  }
  getTipo(id: number): string {
    const tipo = this.tipoCliente.find((p) => p.id === id);
    return tipo ? tipo.value : '';
  }
}
