import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  mostrarMenu: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.mostrarMenu = window.innerWidth > 768;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.mostrarMenu = true; // sempre mostrar no desktop
    } else {
      this.mostrarMenu = false; // esconder no mobile
    }
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

}
