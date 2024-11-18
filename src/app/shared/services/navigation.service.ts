import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  /**
   * Navega para uma rota específica.
   * @param route - Rota para navegar
   */
  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Navega diretamente para uma seção específica, como uma room, na página principal.
   * @param sectionId - ID da seção ou room para rolar até
   */
  navigateToSection(sectionId: string): void {
    const isHomeRoute = this.router.url === '/' || this.router.url === '/home';

    if (isHomeRoute) {
      this.scrollToSection(sectionId);
    } else {
      this.router.navigate(['/home']).then(() => {
        this.scrollToSection(sectionId);
      });
    }
  }

  /**
   * Método específico para navegar entre rooms.
   * Se já estiver na rota da sala, apenas rola até a seção da room.
   * @param roomId - ID da room para rolar até
   */
  navigateToRoom(roomId: string): void {
    const currentUrl = this.router.url;

    // Verifica se já estamos na rota da room
    if (currentUrl.includes('/rooms')) {
      this.scrollToSection(roomId);
    } else {
      // Navega para a rota de rooms e, em seguida, rola até a seção da room
      this.router.navigate(['/rooms']).then(() => {
        this.scrollToSection(roomId);
      });
    }
  }

  /**
   * Função auxiliar para rolar até a seção desejada pelo ID.
   * @param sectionId - ID da seção para rolar
   */
  private scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Section with ID '${sectionId}' not found.`);
      }
    }, 0);
  }
}
