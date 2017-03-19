import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DisqusModule} from "ng2-awesome-disqus";
import {MaterialModule} from "@angular/material";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";
import {BlogRoutingModule} from "./blog-routing.module";
import {CategoryService} from "./shared/category.service";
import {TagService} from "./shared/tag.service";
import {LogFactory} from "../shared/log.factory";
import {CoreModule} from "../core/core.module";
import {ExternalLinkService} from "./shared/external-link.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CovalentCoreModule,
    CovalentLayoutModule,
    DisqusModule,


    CoreModule,
    BlogRoutingModule,
  ],
  declarations: [],
  providers: [
    CategoryService,
    TagService,
    ExternalLinkService
  ]
})
export class BlogModule {

  private logger = this.logFactory.getLog(BlogModule.name);

  constructor(private logFactory: LogFactory,
              private categoryService: CategoryService,
              private tagService: TagService,
              private externalLinkService: ExternalLinkService) {
    let blog = this;
    blog.logger.info('Blog Module is loaded');
    blog.categoryService.registerNavigationMenu();
    blog.tagService.registerNavigationMenu();
    blog.externalLinkService.registerNavigationMenu();
  }
}
