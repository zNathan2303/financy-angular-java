import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Logo } from '../../../icons/logo';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService as UserServiceHttp } from '../../../../core/services/user/user-service';
import { UserService } from '../../../services/user-service';
import { User } from '../../../../core/services/user/user-model';

@Component({
  selector: 'app-header',
  imports: [Logo, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private userServiceHttp = inject(UserServiceHttp);

  currentUserInfo = signal<User | null>(null);

  ngOnInit() {
    const userWithInfo = this.userService.getUserInfo();
    if (!userWithInfo) {
      this.userServiceHttp.get();
    }
    this.currentUserInfo.set(userWithInfo!);
  }

  letterIcon = computed(() => this.currentUserInfo()?.name.slice(0, 2).toUpperCase());

  goToProfilePage() {
    this.router.navigateByUrl('/profile');
  }
}
