import {Injectable} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {NavigationMenu} from "./navigation-menu.model";
import {Subject} from "rxjs";

@Injectable()
export class NavigationMenuService {

  private logger = this.logFactory.getLog(NavigationMenuService.name);

  private menus = [];
  private menus$: Subject<NavigationMenu> = new Subject<NavigationMenu>();

  constructor(private logFactory: LogFactory) {
    let svc = this;
    svc.logger.info('Navigation Menu Service is running.');
  }

  public getMenus() {
    let svc = this;
    return svc.menus$;
  }

  public addNavigationMenu(menu): void {
    let svc = this;
    let navigationMenu = new NavigationMenu(menu);
    svc.menus.push(navigationMenu);
    svc.menus$.next(navigationMenu);
  }

}
