import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AuthService } from '../../providers/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private authService: AuthService
  ) {}

  async login() {
    if (this.username === '' || this.password === '') {
      const toast = await this.toastCtrl.create({
        message: 'Username dan password wajib diisi!',
        duration: 2000,
        color: 'warning',
      });
      toast.present();
      return;
    }

    const body = {
      username: this.username,
      password: this.password,
      aksi: 'login', // Sesuaikan dengan API di backend-mu
    };

    this.postPvdr.postData(body, 'action.php').subscribe(async data => {
      if (data.success) {
        this.authService.login(); // Set status login
        this.router.navigate(['/tabs/tab1']);
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Login gagal, periksa kembali akun Anda.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
    }, async err => {
      const toast = await this.toastCtrl.create({
        message: 'Gagal menghubungi server',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    });
  }
}
