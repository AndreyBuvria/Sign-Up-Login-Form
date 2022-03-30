import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    });
    console.log(this.loginForm.controls.name);
  }

  onSubmit() {}
}
