/* Created by Aquariuslt on 2017-03-18. */
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";
import {TagListComponent} from "./tag-list/tag-list.component";
import {TagDetailComponent} from "./tag-detail/tag-detail.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {PostListComponent} from "./post-list/post-list.component";
const blogRoutes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'post/:year/:month/:date/:postName',
    component: PostDetailComponent
  },
  {
    path: 'tag/:tagName',
    component: TagDetailComponent
  },
  {
    path: 'tags',
    component: TagListComponent
  },
  {
    path: 'category/:categoryName',
    component: CategoryDetailComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule {
}
