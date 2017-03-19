/* Created by Aquariuslt on 2017-03-19. */
import {Injectable} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {NavigationMenuService} from "../../core/shared/navigation-menu.service";
import {Http} from "@angular/http";


@Injectable()
export class ExternalLinkService {


  constructor(private http: Http,
              private navigationMenuService: NavigationMenuService,
              private logFactory: LogFactory) {

    let svc = this;
    svc.loadExternalBlogLinks();
  }

  loadExternalBlogLinks() {

  }
}
