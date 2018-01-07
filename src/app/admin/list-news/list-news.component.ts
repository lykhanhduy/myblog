import { NewService } from './../../new.service';
import { News } from './../../news';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  news: News[];
  public popoverTitle = 'Xóa bài viết';
  public popoverMessage = 'Bạn chắc chắn xóa bài viết này không ?';
  public confirmClicked = false;
  public cancelClicked = false;
  constructor(private newService: NewService) { }

  ngOnInit() {
    this.newService.getListNew()
    .subscribe(data => {
      this.news = data;
      console.log(data);
    });

  }
  deleteNew (id) {
    this.newService.deleteNew(id)
    .subscribe(() => {
      for (let i = 0; i < this.news.length; i++) {
        if ( this.news[i]._id === <any>id ) {
          this.news.splice(i, 1);
        }
      }
    });
  }

}
