import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: 'dark' | 'light' = 'light';

  constructor() {
    this.initTheme();
  }

  public initTheme(): void {
    if (typeof window !== 'undefined') {
      this.loadTheme();
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';

    this.applyTheme();
    this.saveTheme();
  }

  isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  private loadTheme(): void {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.theme = savedTheme as 'dark' | 'light';
      }
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    if (typeof document !== 'undefined') {
      const body = document.body;
      body.classList.remove('dark-theme', 'light-theme');
      body.classList.add(this.theme === 'dark' ? 'dark-theme' : 'light-theme');
    }
  }

  private saveTheme(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', this.theme);
    }
  }
}
