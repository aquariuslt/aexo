/* Created by Aquariuslt on 2017-03-12. */
import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {LogFactory} from "../../shared/log.factory";
import {Subject} from "rxjs";
@Injectable()
export class BlogTitleService {

  constructor(private titleService: Title,
              private router: Router,
              private logFactory: LogFactory) {
    let svc = this;
    svc.logger.info('Blog Title Service is running');
  }


  private logger = this.logFactory.getLog(BlogTitleService.name);

  private baseTitle: string = '';
  private baseTitle$ :Subject<string> = new Subject();

  public loadBaseTitle(baseTitle: string) {
    let svc = this;
    svc.baseTitle$.next(baseTitle);
    svc.baseTitle = baseTitle;
    svc.titleService.setTitle(svc.baseTitle);
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
