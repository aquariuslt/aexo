/* Created by Aquariuslt on 2017-03-12. */
import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {LogFactory} from "../../shared/log.factory";
@Injectable()
export class BlogTitleService {

  constructor(private titleService: Title,
              private router: Router,
              private logFactory: LogFactory) {
    let svc = this;
  }


  private logger = this.logFactory.getLog(BlogTitleService.name);

  private baseTitle: string = '';


  public loadBaseTitle(baseTitle: string) {
    let svc = this;
    svc.baseTitle = baseTitle;
  }


  public setTitle(newTitle?: String) {
    let svc = this;
    if (!newTitle) {
      svc.titleService.setTitle(svc.baseTitle);
    }
    else {
      let combinedTitle = newTitle + ' | ' + svc.baseTitle;
      svc.titleService.setTitle(combinedTitle);
    }
  }

}
