import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./pages/appointments/appointments.page').then(
        (m) => m.AppointmentsPage
      ),
  },
  {
    path: 'exam-results',
    loadComponent: () =>
      import('./pages/exam-results/exam-results.page').then(
        (m) => m.ExamResultsPage
      ),
  },
  {
    path: 'update-data',
    loadComponent: () =>
      import('./pages/update-data/update-data.page').then(
        (m) => m.UpdateDataPage
      ),
  },
  {
    path: 'footer',
    loadComponent: () =>
      import('./footer/footer.page').then((m) => m.FooterPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.page').then((m) => m.RegisterPage),
  },
  
   
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
