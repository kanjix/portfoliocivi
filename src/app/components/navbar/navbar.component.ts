import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Номер WhatsApp в формате международного кода без знака + и пробелов
  // Пример: номер "+7 747 771 9453" -> "77477719453"
  whatsappNumber = '77477719453';
  // Email адрес для ссылки "Почта"
  email = 'jerz.jord@mail.ru';

  get whatsappLink(): string {
    return `https://wa.me/${this.whatsappNumber}`;
  }

  get emailLink(): string {
    return `mailto:${this.email}`;
  }
}
