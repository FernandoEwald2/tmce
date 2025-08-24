import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  mostrarMenu:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

}
