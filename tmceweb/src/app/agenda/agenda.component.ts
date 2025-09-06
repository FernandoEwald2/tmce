import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from 'src/app/global';

@Component({
 
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {

  agendaForm: FormGroup;
  agendaList: any[] = [];

  constructor(private fb: FormBuilder, public global: Global) {
    this.agendaForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      aniversario: ['', Validators.required]
    });
  }
  ngOnInit(): void {    
    
  }

  adicionarContato() {
    if (this.agendaForm.valid) {
      this.agendaList.push(this.agendaForm.value);
      this.agendaForm.reset();
    } else {
      this.agendaForm.markAllAsTouched();
    }
  }

}
