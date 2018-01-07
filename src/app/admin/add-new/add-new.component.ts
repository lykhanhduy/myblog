import { NewService } from './../../new.service';
import { News } from './../../news';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../category';
import { CategoryService } from './../../category.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  constructor(private http: HttpClient, private newService: NewService,
  private categoryService: CategoryService, private flashMassageService: FlashMessagesService,
  private _route: Router) {}
  name = 'content';
  contentCkeditor = '';
  categories: Category[];
  today = new Date();
  ngOnInit() {
    this.categoryService.getListCategory()
    .subscribe(data => this.categories = data);
  }
  onSubmit(formAddNew) {
    let day = '';
    let month = '';
    const dd = this.today.getDate();
    const mm = this.today.getMonth() + 1;
    const yyyy = this.today.getFullYear();
    if ( dd < 10) {
      day = '0' + dd.toString();
    } else {
      day = dd.toString();
    }
    if ( mm < 10) {
      month = '0' + mm.toString();
    } else {
      month = mm.toString();
    }
    const today = day + ' / ' + month + ' / ' + yyyy;
    const fi = this.fileInput.nativeElement;
    const newAdd = formAddNew.value;
    newAdd.timestamp = today;
    newAdd.user = 'admin';
    if (fi.files[0]) {
      newAdd.image = fi.files[0].name;
      this.newService.uploadImage(fi.files[0])
      .subscribe(res => console.log(res));
    }
    this.newService.addNew(newAdd)
    .subscribe(res => {
      this._route.navigate(['/admin/home/listnews']);
      this.flashMassageService.show('Bài viết đã được thêm thành công', { cssClass: 'alert-success', timeout: 3000 });
    });
  }

}
