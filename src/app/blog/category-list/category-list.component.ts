import {Component, OnInit} from "@angular/core";
import {PostService} from "../shared/post.service";
import {LogFactory} from "../../shared/log.factory";
import {BlogTitleService} from "../shared/blog-title.service";

@Component({
  providers: [
    PostService,
    BlogTitleService
  ],
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private logFactory: LogFactory,
              private posts: PostService,
              private titleService: BlogTitleService) {
  }


  private logger = this.logFactory.getLog(CategoryListComponent.name);
  private categoryList = [];
  private selectedCategory = '';
  private selectedPostList = [];

  ngOnInit() {
    let vm = this;
    vm.queryPostList();
    vm.titleService.setTitle('Categories')
  }


  queryPostList() {
    let vm = this;
    vm.posts.getCategoryList()
      .subscribe(function (categoryList) {
        vm.categoryList = categoryList;
        if (categoryList.length >= 1) {
          vm.selectCategory(categoryList[0].category);
        }
      });
  }

  selectCategory(categoryName) {
    let vm = this;
    vm.logger.info('Selected Category:', categoryName);
    vm.selectedCategory = categoryName;
    vm.posts.queryByCategoryName(categoryName)
      .subscribe(function (postList) {
        vm.selectedPostList = postList;
      });
  }
}
