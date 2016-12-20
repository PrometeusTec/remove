import { Injectable } from '@angular/core';
import { Validators, ValidatorFn, FormControl } from '@angular/forms';

import { TdMaxValidator } from '@covalent/core';
import { TdMinValidator } from '@covalent/core';
import { TdNumberRequiredValidator } from '@covalent/core';

import { TdDynamicInputComponent } from '../dynamic-elements/dynamic-input/dynamic-input.component';
import { TdDynamicSlideToggleComponent } from '../dynamic-elements/dynamic-slide-toggle/dynamic-slide-toggle.component';
import { TdDynamicCheckboxComponent } from '../dynamic-elements/dynamic-checkbox/dynamic-checkbox.component';

export enum TdDynamicType {
  Text = <any>'text',
  Boolean = <any>'boolean',
  Number = <any>'number',
}

export enum TdDynamicElement {
  Input = <any>'input',
  Slider = <any>'slider',
  //TextArea = <any>'text-area',
  SlideToggle = <any>'slide-toggle',
  Checkbox = <any>'checkbox',
  //ButtonToggleGroup = <any>'button-toggle-group',
  //ButtonToggle = <any>'button-toggle',
  //RadioGroup = <any>'radio-group',
  //Select = <any>'select',
}

export interface ITdDynamicElementConfig {
    label?: string;
    name: string;
    type: TdDynamicType | TdDynamicElement;
    required?: boolean;
    min?: any;
    max?: any;
    default?: any;
}

@Injectable()
export class TdDynamicFormsService {

  getDynamicElement(element: TdDynamicElement | TdDynamicType): any {
    switch (element) {
      case TdDynamicType.Text:
      case TdDynamicType.Number:
      case TdDynamicElement.Input:
        return TdDynamicInputComponent;
      case TdDynamicType.Boolean:
      case TdDynamicElement.SlideToggle:
        return TdDynamicSlideToggleComponent;
      case TdDynamicElement.Checkbox:
        return TdDynamicCheckboxComponent;
      //case TdDynamicElement.ButtonToggle:
      //case TdDynamicElement.TextArea:
      case TdDynamicElement.Slider:
      //case TdDynamicElement.Select:
      default:
        throw `Error: type ${element} does not exist.`;
    }
  }

  getDefaultElementFlex(element: TdDynamicElement | TdDynamicType): any {
    switch (element) {
      case TdDynamicType.Text:
      case TdDynamicType.Number:
      case TdDynamicElement.Input:
        return 45;
      case TdDynamicType.Boolean:
      case TdDynamicElement.Checkbox:
      case TdDynamicElement.SlideToggle:
        return 20;
      default:
        throw `Error: type ${element} does not exist.`;
    }
  }

  createFormControl(config: ITdDynamicElementConfig): FormControl {
    let validator: ValidatorFn = this.createValidators(config);
    return new FormControl(config.default, validator);
  }

  createValidators(config: ITdDynamicElementConfig): ValidatorFn {
    let validator: ValidatorFn;
    if (config.required) {
      validator = config.type === TdDynamicType.Number ? TdNumberRequiredValidator.validate : Validators.required;
    }
    if (config.max || config.max === 0) {
      validator = Validators.compose([validator, TdMaxValidator.validate(config.max)]);
    }
    if (config.min || config.min === 0) {
      validator = Validators.compose([validator, TdMinValidator.validate(config.min)]);
    }
    return validator;
  }
}