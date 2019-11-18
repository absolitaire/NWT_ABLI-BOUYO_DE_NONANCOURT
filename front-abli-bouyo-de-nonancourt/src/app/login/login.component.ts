import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges  {

  private readonly _form: FormGroup;

  private _model: User;

  constructor() {
    this._form = this._buildForm();
  }

  ngOnInit() {
  }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue && record.model.currentValue.address) {
      this._model = record.model.currentValue;
      this._form.patchValue(this._model);
    } else {
      this._model = {
        login: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: {
          postalCode: '',
          street: '',
          city: ''
        },
        photo: '',
      };
    }
  }
  cancel() {

  }

  submit(value: any) {
  }

  get form(): FormGroup {
    return this._form;
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: User) {
    this._model = model;
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      login: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
  }
}