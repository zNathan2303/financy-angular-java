import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../../shared/components/layout/header/header';
import { InputBase } from '../../shared/components/inputs/input-base/input-base';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Mail, UserRound, LogOut } from 'lucide-angular';
import { Auth } from '../../core/auth/services/auth';
import { Router } from '@angular/router';
import { UserService as UserServiceHttp } from '../../core/services/user/user-service';
import { UserService } from '../../shared/services/user-service';
import { LoadingService } from '../../shared/services/loading-service';

@Component({
  selector: 'app-profile',
  imports: [Header, InputBase, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  readonly Mail = Mail;
  readonly UserRound = UserRound;
  readonly LogOut = LogOut;

  private authService = inject(Auth);
  private userService = inject(UserService);
  private userServiceHttp = inject(UserServiceHttp);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  letterIcon = signal('');
  fullName = signal('');
  email = signal('');

  ngOnInit() {
    this.loadingService.show();

    const userData = this.userService.getUserInfo();

    if (userData) {
      this.letterIcon.set(userData.name.slice(0, 2).toUpperCase());
      this.fullName.set(userData.name);
      this.email.set(userData.email);

      this.fullNameFormControl.setValue(userData.name);
      this.emailFormControl.setValue(userData.email);

      this.loadingService.hide();
    } else {
      this.userServiceHttp.get().subscribe({
        next: (res) => {
          this.letterIcon.set(res.name.slice(0, 2).toUpperCase());
          this.fullName.set(res.name);
          this.email.set(res.email);

          this.fullNameFormControl.setValue(res.name);
          this.emailFormControl.setValue(res.email);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.loadingService.hide();
        },
      });
    }
  }

  fullNameFormControl = new FormControl({ value: this.fullName(), disabled: false });
  emailFormControl = new FormControl({ value: this.email(), disabled: true });

  updateForm = new FormGroup({
    fullName: this.fullNameFormControl,
  });

  submit() {
    this.updateForm.markAllAsTouched();
    console.log(this.updateForm.value);
    console.log(this.updateForm.valid);
  }

  logout() {
    this.authService.logout();
    this.userService.clearUser();
    this.router.navigateByUrl('/login');
  }
}
