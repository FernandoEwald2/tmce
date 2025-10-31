import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Global } from 'src/app/global';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent implements OnInit {
  totalPagina: number = 1;
  pagina: number = 1;
  itensPorPagina: number = 10;
  agendaForm: FormGroup;
  agendaList: any[] = [];
  nome: string = '';
  dataNascimento: string = '';
  mobile: boolean = false;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    public global: Global,
    private apiService: ApiService
  ) {
    this.agendaForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      data_nascimento: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.agendaList = [];
    this.mobile = window.innerWidth <= 768;
    this.buscarAgendas();
  }

  adicionarContato() {
    if (this.agendaForm.valid) {
      this.apiService.post(`Agenda`, this.agendaForm.value).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            html: 'Operação realizada com sucesso!',
          });
          this.buscarAgendas();
          this.agendaForm.reset();
        },
        error: (err) => {

          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Ocorreu um erro ao inserir a agenda.' + (err.message || ''),
          });          
        },
      });
    } else {
      this.agendaForm.markAllAsTouched();
    }
  }

  buscarAgendas() {
    const tempoMinimo = 800;
    const inicio = performance.now();

    var rul = `Agenda?pagina=${this.pagina}&quantidade_por_pagina=${this.itensPorPagina}`;
    if (this.nome && this.nome.trim() != '') {
      rul += `&nome=${this.nome.trim()}`;
    }
    if (this.dataNascimento && this.dataNascimento.trim() != '') {
      rul += `&data_nascimento=${this.dataNascimento.trim()}`;
    }

    Swal.fire({
      title: 'Aguarde...',
      text: 'Estamos processando sua solicitação!',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.apiService.get<any>(rul).subscribe({
      next: (data) => {
        this.nome = '';
        this.dataNascimento = '';
        const fim = performance.now();
        const tempoExecucao = fim - inicio;
        const restante = Math.max(0, tempoMinimo - tempoExecucao); //this.agendaList = data.itens || [];

        setTimeout(() => {
          this.totalPagina = Math.ceil(
            data.total_de_registros / this.itensPorPagina
          );
          this.agendaList = data.itens || [];
          Swal.close();
        }, restante);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu um erro ao buscar as agendas.' + (err.message || ''),
        });
      },
    });
  }
  voltarPagina = () => {
    if (this.pagina >= 2) this.pagina = this.pagina - 1;
    this.buscarAgendas();
  };
}
