// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgForOf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  whatsappNumber = '77001234567'; // поменяй на свой
  email = 'youremail@example.com'; // поменяй на свой

  get whatsappLink(): string {
    return `https://wa.me/${this.whatsappNumber}`;
  }

  get emailLink(): string {
    return `mailto:${this.email}`;
  }
}
