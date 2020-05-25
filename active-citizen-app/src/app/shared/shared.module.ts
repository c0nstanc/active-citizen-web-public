import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './modules/material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaConfig } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
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

import { FormErrorMessageComponent } from './component/form-error-message/form-error-message.component';
import { PageTitleComponent } from './component/page-title/page-title.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavMenuItemComponent } from './component/sidenav-menu-item/sidenav-menu-item.component';
import { SimpleFileDropComponent } from './component/simple-file-drop/simple-file-drop.component';
import { ImageInputComponent } from './component/image-input/image-input.component';
import { WizardStepTitleComponent } from './component/wizard-step-title/wizard-step-title.component';
import { WizardComponent } from './component/wizard/wizard.component';
import { WizardNxtBtnComponent } from './component/wizard-nxt-btn/wizard-nxt-btn.component';
import { SimpleModalComponent } from './component/simple-modal/simple-modal.component';
import { ModalContentComponent } from './component/modal-content/modal-content.component';
import { ModalFooterComponent } from './component/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './component/modal-header/modal-header.component';
import { CameraComponent } from './component/camera/camera.component';
import { LanguageSelectionComponent } from './component/language-selection/language-selection.component';
import { TakePictureComponent } from './component/take-picture/take-picture.component';
import { MenuComponent } from './component/menu/menu.component';
import { ImageViewerComponent } from './component/image-viewer/image-viewer.component';
import { FileListComponent } from './component/file-list/file-list.component';
import { ImageDropComponent } from './component/image-drop/image-drop.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { DateAgoPipe } from './pipe/date-ago.pipe';
import { CarouselComponent } from './component/carousel/carousel.component';
import { ProgressIndigatorComponent } from './component/progress-indigator/progress-indigator.component';
import { CardComponent } from './component/card/card.component';
import { AutocompleteSelectComponent } from './component/autocomplete-select/autocomplete-select.component';
import { TextAreaComponent } from './component/text-area/text-area.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    NgbModule,

    FontAwesomeModule,
    MaterialModule,
  ],
  declarations: [
    // Components
    FormErrorMessageComponent,
    PageTitleComponent,
    SidenavMenuItemComponent,
    SimpleFileDropComponent,
    ImageInputComponent,
    WizardStepTitleComponent,
    WizardComponent,
    WizardNxtBtnComponent,
    SimpleModalComponent,
    ModalContentComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    CameraComponent,
    LanguageSelectionComponent,
    TakePictureComponent,
    MenuComponent,
    ImageViewerComponent,
    FileListComponent,
    ImageDropComponent,
    TimelineComponent,
    CarouselComponent,
    ProgressIndigatorComponent,
    CardComponent,
    AutocompleteSelectComponent,
    TextAreaComponent,

    // Pipes
    DateAgoPipe,

  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    MaterialModule,
    NgbModule,
    FontAwesomeModule,

    // Components
    FormErrorMessageComponent,
    PageTitleComponent,
    SidenavMenuItemComponent,
    ImageInputComponent,
    WizardStepTitleComponent,
    WizardNxtBtnComponent,
    LanguageSelectionComponent,
    MenuComponent,
    TimelineComponent,
    CarouselComponent,
    ProgressIndigatorComponent,
    CardComponent,
    AutocompleteSelectComponent,
    TextAreaComponent,

    // Pipes
    DateAgoPipe,

  ]
})
export class SharedModule {
  constructor(config: FaConfig) {
    config.fallbackIcon = faBan;
  }
}
