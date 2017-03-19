/* Created by Aquariuslt on 2017-03-19. */
import {Injectable} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {NavigationMenuService} from "../../core/shared/navigation-menu.service";
import {environment} from "../../../environments/environment";
import * as _ from "lodash";
import {NavigationMenu} from "../../core/shared/navigation-menu.model";
import {NavigationLink} from "../../core/shared/navigation-link.model";

@Injectable()
export class ExternalLinkService {


  private logger = this.logFactory.getLog(ExternalLinkService.name);

  constructor(private navigationMenuService: NavigationMenuService,
              private logFactory: LogFactory) {
  }


  public registerNavigationMenu() {
    let svc = this;
    let blogLinks = environment.blog.externalLinks;

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
      setTimeout(function(){
        svc.navigationMenuService.addNavigationMenu(menu);
      },1000)
    });
  }


}
