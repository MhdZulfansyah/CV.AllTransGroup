import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab4Page implements OnInit {
 rental_datas: any = [];
 limit: number = 10;
 start: number = 0;
 constructor(
 private router: Router,
 private postPvdr: PostProvider,
 public toastController: ToastController,
 ) { }
 ngOnInit() {
 }
 ionViewWillEnter() {
 this.rental_datas = [];
 this.start = 0;
 this.loadrental();
 }
 doRefresh(event: any) {
 setTimeout(() => {
 this.ionViewWillEnter();
 event.target.complete();
 }, 500);
 }
  loadData(event: any) {
 this.start += this.limit;
 setTimeout(() => {
 this.loadrental().then(() => {
 event.target.complete();
 });
 }, 500);
 }
 loadrental() {
 return new Promise(resolve => {
 let body = {
 aksi: 'getdata',
 limit : this.limit,
 start : this.start,
 };
 this.postPvdr.postData(body, 'action.php').subscribe(data => {
 for (let rental_data of data.result) {
 this.rental_datas.push(rental_data);
 }
 resolve(true);
 });
 });
 }
}