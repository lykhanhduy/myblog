import { CategoryService } from './category.service';
import { NewService } from './new.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from 'ng2-ckeditor';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { FooterComponent } from './admin/footer/footer.component';
import { ListNewsComponent } from './admin/list-news/list-news.component';
import { EditNewComponent } from './admin/edit-new/edit-new.component';
import { AddNewComponent } from './admin/add-new/add-new.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LoginComponent
  },
  { path: 'admin/home', component: DashboardComponent, canActivate: [AuthGuard],
      children: [
       { path: 'listnews', component: ListNewsComponent },
       { path: 'editnew/:id', component: EditNewComponent },
       { path: 'addnew', component: AddNewComponent }
      ]
    }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ListNewsComponent,
    EditNewComponent,
    AddNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
  ],
  providers: [UserService, AuthGuard, NewService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
