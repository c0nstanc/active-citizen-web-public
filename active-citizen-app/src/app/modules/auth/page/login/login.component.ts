import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, delay, finalize, catchError, startWith } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  asterisk$: Observable<IconDefinition>;
  error: string;
  isLoading: boolean;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
    this.initializeIcons();
  }

  ngOnInit() { }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.authService.login(credentials)
      .pipe(
        delay(1000),
        tap(user => this.router.navigate(['/incidents/my-incidents'])),
        finalize(() => this.isLoading = false),
        catchError(error => of(this.error = error))
      ).subscribe();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  private initializeIcons(): void {
    this.asterisk$ = this.loadUserCircle().pipe(startWith(faAsterisk));
  }

  private loadUserCircle(): Observable<IconDefinition> {
    return of(faAsterisk);
  }

}
