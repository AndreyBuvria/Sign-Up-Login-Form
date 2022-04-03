import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  signupForm!: FormGroup;
  notice: boolean = false;
  error: boolean = false;

  readonly destroy$ = new Subject<void>();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null,Validators.required), // not used to request
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    });
  }

  onSubmit() {
    if(this.signupForm.invalid) { return; }

    const authData = {
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    };

    const sub = this.auth.signUp(authData)
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe(() => {
        this.error = false;
        this.notice = true;
      },(error) => {
        console.log(error)
        this.error = true;
        this.notice = true;
    });

    this.signupForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
