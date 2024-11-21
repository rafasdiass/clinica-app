import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'exam-results',
    loadComponent: () =>
      import('./pages/exam-results/exam-results.page').then(
        (m) => m.ExamResultsPage
      ),
  },
  {
    path: 'agendamentos',
    loadComponent: () =>
      import('./pages/schedule-appointment/schedule-appointment.page').then(
        (m) => m.ScheduleAppointmentPage
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
      import('./pages/footer/footer.page').then((m) => m.FooterPage),
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
  {
    path: 'schedule-details',
    loadComponent: () =>
      import(
        './pages/schedule-appointment/schedule-details/schedule-details.page'
      ).then((m) => m.ScheduleDetailsPage),
  },
  {
    path: 'schedule-appointment',
    loadComponent: () =>
      import('./pages/schedule-appointment/schedule-appointment.page').then(
        (m) => m.ScheduleAppointmentPage
      ),
  },
  {
    path: 'select-appointment',
    loadComponent: () =>
      import(
        './pages/schedule-appointment/select-appointment/select-appointment.page'
      ).then((m) => m.SelectAppointmentPage),
  },
  {
    path: 'date-picker',
    loadComponent: () => import('./pages/date-picker/date-picker.page').then( m => m.DatePickerPage)
  },
  {
    path: 'patient-profile',
    loadComponent: () => import('./pages/patient-profile/patient-profile.page').then( m => m.PatientProfilePage)
  },
];
