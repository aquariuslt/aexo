import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {LogFactory} from "../../shared/log.factory";
import {environment} from "../../../environments/environment";
import {NavigationMenuService} from "../../core/shared/navigation-menu.service";
import * as _ from "lodash";
import {NavigationMenu} from "../../core/shared/navigation-menu.model";
import {NavigationLink} from "../../core/shared/navigation-link.model";
@Injectable()
export class CategoryService {

  private logger = this.logFactory.getLog(CategoryService.name);
  private datasource = environment.datasource;

  constructor(private http: Http,
              private navigationMenuService: NavigationMenuService,
              private logFactory: LogFactory) {
    let svc = this;
    svc.loadCategories();
  }

  private loadCategories() {
    let svc = this;
    svc.http.get(svc.datasource.categories).share();
  }

  public registerNavigationMenu() {
    let svc = this;
    svc.http.get(svc.datasource.categories)
      .map(function (response) {
        return response.json();
      })
      .subscribe(function (categories) {
        svc.navigationMenuService.addNavigationMenu(svc.buildCategoryMenus(categories));
      })
  }

  private buildCategoryMenus(categories) {
    let categoryLinks: Array<NavigationLink> = [];
    categoryLinks.push(new NavigationLink({
      external: false,
      link: '/categories',
      displayName: 'All',
      description: 'All Categories'
    }));
    _.each(categories, function (category) {
      let categoryName = category.category;
      let categoryLink = new NavigationLink({
        external: false,
        link: '/category/' + categoryName,
        displayName: categoryName,
        description: categoryName
      });
      categoryLinks.push(categoryLink);
    });
    return new NavigationMenu({
      label: 'Categories',
      links: categoryLinks
    });
  }


}
