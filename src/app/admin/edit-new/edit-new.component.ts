import { NewService } from './../../new.service';
import { News } from './../../news';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../category';
import { CategoryService } from './../../category.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.css']
})
export class EditNewComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  new: News;
  name = 'content';
  _id: string;
  title: string;
  description: string;
  image: string;
  contentCkeditor: string;
  category: string;
  categories: Category[];
  constructor(private route: ActivatedRoute, private http: HttpClient, private newService: NewService,
    private categoryService: CategoryService, private flashMassageService: FlashMessagesService,
    private _route: Router) {}

  ngOnInit() {
    this.route.paramMap
    .subscribe((param: ParamMap) => this.newService.getNew(param.get('id'))
    .subscribe(data => {
      this._id = data._id;
      this.new = data;
      this.title = data.title;
      this.description = data.description;
      this.category = data.category;
      this.image = data.image;
      this.contentCkeditor = data.content;
    })
    );

    this.categoryService.getListCategory()
    .subscribe(data => this.categories = data);
  }
  onSubmit(formEditNew) {
    const fi = this.fileInput.nativeElement;
    const newEdit = formEditNew.value;
    if (fi.files[0]) {
      newEdit.image = fi.files[0].name;
      this.newService.uploadImage(fi.files[0])
      .subscribe(res => console.log(res));
    }
    this.newService.editNew(this._id, newEdit)
    .subscribe(res => {
      console.log(res);
      this._route.navigate(['/admin/home/listnews']);
      this.flashMassageService.show('Bài viết đã được sửa thành công', { cssClass: 'alert-success', timeout: 3000 });
    });
  }
}
