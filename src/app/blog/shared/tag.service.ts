import {Injectable} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {NavigationMenuService} from "../../core/shared/navigation-menu.service";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {CategoryService} from "./category.service";
import {NavigationLink} from "../../core/shared/navigation-link.model";
import {NavigationMenu} from "../../core/shared/navigation-menu.model";

@Injectable()
export class TagService {

  private logger = this.logFactory.getLog(CategoryService.name);
  private datasource = environment.datasource;

  constructor(private http: Http,
              private navigationMenuService: NavigationMenuService,
              private logFactory: LogFactory) {
    let svc = this;
    svc.loadTags();
  }

  private loadTags() {
    let svc = this;
    svc.http.get(svc.datasource.tags).share();
  }

  public registerNavigationMenu() {
    let svc = this;
    svc.http.get(svc.datasource.tags)
      .map(function (response) {
        return response.json();
      })
      .subscribe(function (tags) {
        svc.navigationMenuService.addNavigationMenu(svc.buildTagMenus(tags));
      })
  }

  private buildTagMenus(tags) {
    let tagLinks: Array<NavigationLink> = [];
    tagLinks.push(new NavigationLink({
      external: false,
      link: '/tags',
      displayName: 'All',
      description: 'All Tags'
    }));

    return new NavigationMenu({
      label: 'Tags',
      links: tagLinks
    })
  }

  public getTagList() {
    let svc = this;
    svc.logger.info('Load Tags from:', svc.datasource.tags);
    return svc.http.get(svc.datasource.tags)
      .map(function (response) {
        return response.json();
      });
  }


}
