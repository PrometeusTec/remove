import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CovalentCoreModule } from '@covalent/core';

import { TdDynamicFormsComponent } from './dynamic-forms.component';
import { TdDynamicElementComponent, TdDynamicElementDirective } from './dynamic-element.component';

import { TdDynamicInputComponent } from './dynamic-elements/dynamic-input/dynamic-input.component';
import {
  TdDynamicSlideToggleComponent,
} from './dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component';
import {
  TdDynamicCheckboxComponent,
} from './dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';

const TD_DYNAMIC_FORMS: Type<any>[] = [
  TdDynamicFormsComponent,
  TdDynamicElementComponent,
  TdDynamicElementDirective,
];

const TD_DYNAMIC_FORMS_ENTRY_COMPONENTS: Type<any>[] = [
  TdDynamicInputComponent,
  TdDynamicSlideToggleComponent,
  TdDynamicCheckboxComponent,
];

@NgModule({
  declarations: [
    TD_DYNAMIC_FORMS,
    TD_DYNAMIC_FORMS_ENTRY_COMPONENTS,
  ],
  imports: [
    ReactiveFormsModule,
    CovalentCoreModule.forRoot(),
  ],
  exports: [
    TD_DYNAMIC_FORMS,
    TD_DYNAMIC_FORMS_ENTRY_COMPONENTS,
  ],
  entryComponents: [ TD_DYNAMIC_FORMS_ENTRY_COMPONENTS ],
})
export class CovalentDynamicFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CovalentDynamicFormsModule,
      providers: [ ],
    };
  }
}