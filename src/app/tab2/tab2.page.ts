import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab2Page implements OnInit {

  NamaPembooking: string = '';
  nohp: string = '';
  TanggalBooking: string = '';
  TanggalPengembalian: string = '';
  TypeUnit: string = '';
  HargaPerhari: string = '';
  Layanan: string = '';
  Keterangan: string = '';
  

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
  ) {

  }

  ngOnInit() {
  }

  async addRegister() {
    if (this.NamaPembooking == '') {
      const toast = await this.toastController.create({
        message: 'Nama lengkap harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.nohp == '') {
      const toast = await this.toastController.create({
        message: 'No HP/WA harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.TanggalBooking == '') {
      const toast = await this.toastController.create({
        message: 'harus di isi',
        duration: 2000
      });
      toast.present();

    } else if (this.TanggalPengembalian == '') {
      const toast = await this.toastController.create({
        message: ' harus di isi',
        duration: 2000
      });
      toast.present();

    } else if (this.TypeUnit == '') {
      const toast = await this.toastController.create({
        message: 'harus di isi',
        duration: 2000
      });

    }else if (this.HargaPerhari == '') {
      const toast = await this.toastController.create({
        message: 'harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.Layanan == '') {
      const toast = await this.toastController.create({
        message: 'harus di isi',
        duration: 2000
      });
      toast.present();

    } else if (this.Keterangan == '') {
      const toast = await this.toastController.create({
        message: 'harus di isi',
        duration: 2000
      });
      toast.present();

    } else {
      let body = {
        NamaPembooking: this.NamaPembooking,
        nohp: this.nohp,
        TanggalBooking: this.TanggalBooking,
        TanggalPengembalian: this.TanggalPengembalian,
        TypeUnit: this.TypeUnit,
        HargaPerhari: this.HargaPerhari,
        Layanan: this.Layanan,
        Keterangan: this.Keterangan,
        aksi: 'add_register'
      };
      this.postPvdr.postData(body, 'action.php').subscribe(async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/tab2']);
          const toast = await this.toastController.create({
            message: 'Selamat! Registrasi sukses.',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
          toast.present();
        }

      });

    }
  }
}