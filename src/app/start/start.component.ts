import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  form!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public canSeeUserText(): boolean {
    return this.authService.isAuthenticated();
  }

  public canSeeAdminText(): boolean {
    return this.authService.isAdmin();
  }

  public loginSubmit() {
    this.authService.login(
      this.form.value.username,
      this.form.value.password
    )
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.form.reset()
            this.error = ''
          } else {
            this.error = 'Failed to login.Check your your username and password';
          }
        })
      )
      .subscribe()
  }

  private initializeForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

}
