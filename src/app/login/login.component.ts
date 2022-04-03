import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, concatMap, catchError } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  notice: boolean = false;
  error: boolean = false;

  readonly destroy$ = new Subject<void>();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    });
  }

  onSubmit() {
    if(this.loginForm.invalid) { return; }

    const authData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    const sub = this.auth.signIn(authData)
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

    console.log(sub);

    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
