import { Component, inject, OnInit, signal } from '@angular/core';
import { Logo } from '../../../icons/logo';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../../core/services/user/user-service';

@Component({
  selector: 'app-header',
  imports: [Logo, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);

  letterIcon = signal('');

  ngOnInit() {
    const currentUser = this.userService.getUserData();

    if (currentUser) {
      this.letterIcon.set(currentUser.name.charAt(0).toUpperCase());
    } else {
      this.userService.get().subscribe({
        next: (res) => {
          this.letterIcon.set(res.name.charAt(0).toUpperCase());
        },
        error: (err) => {
          this.letterIcon.set('.');
          console.log(err);
        },
      });
    }
  }

  goToProfilePage() {
    this.router.navigateByUrl('/profile');
  }
}
