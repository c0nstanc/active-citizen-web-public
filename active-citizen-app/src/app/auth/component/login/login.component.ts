import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, delay, finalize, catchError, startWith } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'subsink';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

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

  ngOnInit(): void { }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.subs.sink = this.authService.login(credentials)
      .pipe(
        delay(1000),
        tap(user => this.router.navigate(['/incidents/'])),
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
