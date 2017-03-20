/* Created by Aquariuslt on 2017-03-20. */
import {Injectable} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {NavigationMenuService} from "../../core/shared/navigation-menu.service";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {CategoryService} from "./category.service";
import {NavigationMenu} from "../../core/shared/navigation-menu.model";
import {NavigationLink} from "../../core/shared/navigation-link.model";
import * as _ from "lodash";
import {Author} from "../../core/shared/author.model";
@Injectable()
export class BlogConfigService {

  private logger = this.logFactory.getLog(CategoryService.name);
  private datasource = environment.datasource;


  constructor(private http: Http,
              private navigationMenuService: NavigationMenuService,
              private logFactory: LogFactory) {
    let svc = this;
    svc.loadApplicationProperties();
  }


  loadApplicationProperties() {
    let svc = this;
    svc.http.get(svc.datasource.application).share();
  }

  public registerNavigationMenu() {
    let svc = this;
    svc.http.get(svc.datasource.application)
      .map(function (response) {
        return response.json();
      })
      .subscribe(function (applicationProperties) {
        let blogLinks = applicationProperties.blog.externalLinks;
        _.each(blogLinks, function (blogLinkCategory) {
          let subLinks: Array<NavigationLink> = [];
          _.each(blogLinkCategory.links, function (link) {
            subLinks.push(new NavigationLink({
              external: true,
              url: link.url,
              displayName: link.displayName,
              description: link.description
            }));
          });

          let menu = new NavigationMenu({
            label: blogLinkCategory.label,
            links: subLinks
          });
          svc.navigationMenuService.addNavigationMenu(menu);
        });
      });
  }


  public registerAuthorInfo() {
    let svc = this;
    svc.http.get(svc.datasource.application)
      .map(function (response) {
        return response.json();
      })
      .subscribe(function (applicationProperties) {
        svc.navigationMenuService.applyAuthorInfo(new Author({
          author: applicationProperties.blog.author,
          avatorUrl: applicationProperties.blog.avator,
          description: applicationProperties.blog.description
        }));
      })
  }
}
