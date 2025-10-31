import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Global } from 'src/app/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  totalPagina: number = 1;
  pagina: number = 1;
  itensPorPagina: number = 10;
  usuarioForm!: FormGroup;
  carregandoCep = false;
  erroCep = '';
  buscaCep: string = '';
  listaUsuarios: any[] = []; // Lista para armazenar usuários
  mobile: boolean = false;
  usuarioEditar: any = null;
  busca: string = '';

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    public global: Global,   
    private apiService: ApiService // private _global: Global
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      login: ['', [Validators.required, Validators.minLength(4)]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // só números
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      logradouro: [''],
      perfil: ['', [Validators.required]],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });

    this.usuarioForm.get('cep')?.valueChanges.subscribe((cepValue) => {
      this.buscaCep = cepValue?.replace(/\D/g, '') || '';

      // Só dispara a busca se tiver 8 dígitos
      if (this.buscaCep.length === 8) {
        this.onCepBlur();
      }
    });

    this.mobile = window.innerWidth <= 768;

    this.buscarUsuarios();
  }

  onCepBlur() {
    const cep = this.usuarioForm.get('Cep')?.value;
    if (!cep || this.usuarioForm.get('Cep')?.invalid) {
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
          Logradouro: data.logradouro || '',
          Bairro: data.bairro || '',
          Cidade: data.localidade || '',
          Estado: data.uf || '',
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

    if (this.usuarioEditar.id != null || this.usuarioEditar.id != undefined) {
      const senhaAtual = this.usuarioForm.get('senha')?.value;

      this.usuarioForm.get('senha')?.setValue(this.global.gerarMD5(senhaAtual)),
        this.apiService
          .put(`Usuario/${this.usuarioEditar.id}`, this.usuarioForm.value)
          .subscribe({
            next: (data) => {
              this.buscarUsuarios();
              this.usuarioEditar = null;
              this.usuarioForm.reset();
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao atualizar usuário ' + (err.message || ''),
              });
            },
          });
    } else {
      const senhaAtual = this.usuarioForm.get('senha')?.value;
      this.usuarioForm.get('senha')?.setValue(this.global.gerarMD5(senhaAtual)),
        this.apiService.post(`Usuario`, this.usuarioForm.value).subscribe({
          next: (data) => {            
            this.buscarUsuarios();
            this.usuarioEditar = null;
            this.usuarioForm.reset();
          },
          error: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao atualizar usuário' + (err.message || ''),
              });
          },
        });
    }
  }

  limparFormulario() {
    this.usuarioForm.reset();
    this.usuarioEditar = null;
  }

  validarUsuarioEditado() {
    if (this.usuarioEditar !== null) return true;
    else return false;
  }
  removerUsuario(usuario: any) {
    this.apiService.delete(`Usuario/${usuario.id}`).subscribe({
      next: (data) => {
        console.log('Usuário removido com sucesso:', data);

        this.buscarUsuarios();
      },
      error: (err) => {
        console.error('Erro ao remover usuário:', err);
      },
    });
  }
  editarUsuario(usuario: any) {
    console.log(usuario);
    this.usuarioEditar = usuario;
    this.usuarioForm.patchValue(usuario);
  }
  getNomePerfil(id: number): string {
    const perfil = this.global.listaPerfis.find((p) => p.id === id);
    return perfil ? perfil.value : '';
  }

  buscarUsuarios() {
    const tempoMinimo = 800;
    const inicio = performance.now();

    var url = `Usuario?pagina=${this.pagina}&quantidade_por_pagina=${this.itensPorPagina}`;
    if (this.busca && this.busca.trim() != '') {
      url += `&busca=${this.busca.trim()}`;
    }

    Swal.fire({
      title: 'Aguarde...',
      text: 'Estamos processando sua solicitação!',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.apiService.get<any>(url).subscribe({
      next: (data) => {
        const fim = performance.now();
        const tempoExecucao = fim - inicio;
        const restante = Math.max(0, tempoMinimo - tempoExecucao);

        setTimeout(() => {
          this.busca = '';
          this.totalPagina = Math.ceil(
            data.total_de_registros / this.itensPorPagina
          );
          this.listaUsuarios = data.itens || [];
          Swal.close();
        }, restante);
      },
      error: (err) => {       

        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu um erro ao buscar os usuários. \n' + (err.message || ''),
        });
      },
    });
  }

  voltarPagina = () => {
    if (this.pagina >= 2) this.pagina = this.pagina - 1;
    this.buscarUsuarios();
  };
}
