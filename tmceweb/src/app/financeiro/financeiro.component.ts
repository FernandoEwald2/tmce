import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.component.scss',
})
export class FinanceiroComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  isUploading = false;
  importacoes: any[] = [];
  colunaOrdenacao: keyof any | '' = '';
  direcaoOrdenacao: 'asc' | 'desc' = 'asc';

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0] ? input.files[0] : null;

    if (!file) {
      this.selectedFile = null;
      return;
    }

    // Checagem por extensão (alguns browsers não definem type como 'text/csv')
    const isCsv = /\.csv$/i.test(file.name);
    if (!isCsv) {
      alert('Selecione um arquivo .csv válido!');
      this.clearFile();
      return;
    }

    this.selectedFile = file;
  }

  clearFile() {
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // limpa o texto do input
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.isUploading = true;

    this.importacoes.unshift({
      nome: this.selectedFile!.name,
      dataHora: new Date(),
    });

    Swal.fire({
      icon: 'success',
      title: 'Ok !!! Arquivo enviado',
      text: 'Upload concluído com sucesso!',
    });

    this.isUploading = false;
    this.clearFile(); // também limpa após sucesso

    // this.http.post('http://localhost:5000/api/importar-csv', formData).subscribe({
    //   next: () => {
    //
    //     this.isUploading = false;
    //     this.clearFile(); // também limpa após sucesso
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     alert('Erro no upload do arquivo!');
    //     this.isUploading = false;
    //     // opcional: this.clearFile();
    //   }
    // });
  }
  ordenar(coluna: keyof any) {
    if (this.colunaOrdenacao === coluna) {
      // troca a direção
      this.direcaoOrdenacao = this.direcaoOrdenacao === 'asc' ? 'desc' : 'asc';
    } else {
      // define nova coluna e reseta direção
      this.colunaOrdenacao = coluna;
      this.direcaoOrdenacao = 'asc';
    }

    this.importacoes.sort((a, b) => {
      let valorA = a[coluna];
      let valorB = b[coluna];

      if (valorA instanceof Date && valorB instanceof Date) {
        return this.direcaoOrdenacao === 'asc'
          ? valorA.getTime() - valorB.getTime()
          : valorB.getTime() - valorA.getTime();
      }

      const strA = String(valorA).toLowerCase();
      const strB = String(valorB).toLowerCase();

      if (strA < strB) return this.direcaoOrdenacao === 'asc' ? -1 : 1;
      if (strA > strB) return this.direcaoOrdenacao === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
