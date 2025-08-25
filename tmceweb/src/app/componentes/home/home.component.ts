import { Component, OnInit } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  colorScheme: any = '';

  receitasVsDespesas = [
    { name: 'Receitas', value: 14500 },
    { name: 'Despesas', value: 9800 }
  ];
   despesasMensais = [
    { name: 'Jan', value: 1200 },
    { name: 'Fev', value: 1300 },
    { name: 'Mar', value: 950 },
    { name: 'Abr', value: 1100 },
    { name: 'Mai', value: 1500 },
    { name: 'Jun', value: 1700 },    
    { name: 'Jul', value: 1600 },
    { name: 'Ago', value: 0 },
    { name: 'Set', value: 0 },
    { name: 'Out', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dez', value: 0 }
  ];

  categoriasGastos = [
    { name: 'Alimentação', value: 2200 },
    { name: 'Transporte', value: 900 },
    { name: 'Saúde', value: 600 },
    { name: 'Lazer', value: 400 },
    { name: 'Outros', value: 700 }
  ];

  saldoMensal = [
    { name: 'Jan', value: 300 },
    { name: 'Fev', value: 500 },
    { name: 'Mar', value: 150 },
    { name: 'Abr', value: 400 },
    { name: 'Mai', value: -100 },
    { name: 'Jun', value: 800 },
    { name: 'Jul', value: 600 },
    { name: 'Ago', value: 1500 },
    { name: 'Set', value: 0 },
    { name: 'Out', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dez', value: 0 }
  ];

  constructor() { }

  ngOnInit(): void {
    this.colorScheme = colorSets.find(s => s.name === 'ocean') || { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  }

}
