import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaConfig } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FileDropModule } from '@browninglogic/ng-file-drop';

import {
  faImages,
  faCodeBranch,
  faAsterisk,
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faBan
} from '@fortawesome/free-solid-svg-icons';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(
  faImages,
  faGithub,
  faCodeBranch,
  faAsterisk,
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faBan
);

import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { PageTitleComponent } from './component/page-title/page-title.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatFileUploadComponent } from './component/mat-file-upload/mat-file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FileDropModule,

    NgbModule,
    FontAwesomeModule,
    MaterialModule,
  ],
  declarations: [ControlMessagesComponent,
    PageTitleComponent,
    MatFileUploadComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FileDropModule,
    MaterialModule,

    NgbModule,
    FontAwesomeModule,

    ControlMessagesComponent,
    PageTitleComponent,
    MatFileUploadComponent
  ]
})
export class SharedModule {
  constructor(config: FaConfig) {
    config.fallbackIcon = faBan;
  }
}
