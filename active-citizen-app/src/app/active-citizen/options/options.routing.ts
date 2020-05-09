import { Routes, RouterModule } from '@angular/router';
import { UserOptionsComponent } from './page/user-options/user-options.component';

const routes: Routes = [
  {
    path: '',
    component: UserOptionsComponent,
    loadChildren: () =>
      import('./page/user-options/option-tabs/option-tabs.module').then(m => m.OptionTabsModule)
  },

];

export const OptionsRoute = RouterModule.forChild(routes);
