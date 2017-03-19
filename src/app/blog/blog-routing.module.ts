/* Created by Aquariuslt on 2017-03-18. */
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
const blogRoutes: Routes = [];

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
