import { Routes, RouterModule } from '@angular/router';
import { UserOptionsComponent } from './pages/user-options/user-options.component';

const routes: Routes = [
  {
    path: '',
    component: UserOptionsComponent,
    loadChildren: () =>
      import('./pages/user-options/option-tabs/option-tabs.module').then(m => m.OptionTabsModule)
  },

];

export const OptionsRoutingModule = RouterModule.forChild(routes);
