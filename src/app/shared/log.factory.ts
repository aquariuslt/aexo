/* Created by Aquariuslt on 2017-02-26. */
import {Injectable} from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";

@Injectable()
export class LogFactory {
  private loggerMap = new Map<string,Logger>();

  constructor() {
  }

  public getLog(className: string): Logger {
    let self = this;
    if (self.loggerMap.has(className)) {
      return self.loggerMap.get(className);
    }
    else {
      self.loggerMap.set(className, new Logger(className));
      return self.loggerMap.get(className);
    }
  }
}


class Logger {
  private moduleName;

  constructor(className?: string) {
    if (!_.isUndefined(className)) {
      this.moduleName = className;
    }
    else {
      this.moduleName = '';
    }
  }


  info(value: any, ...rest) {
    console.log(this.now() + ' [' + this.moduleName + '] ' + value, ...rest);
  }

  error(value: any, ...rest) {
    console.error(this.now() + ' [' + this.moduleName + '] ' + value, ...rest);
  }

  warn(value: any, ...rest) {
    console.warn(this.now() + ' [' + this.moduleName + '] ' + value, ...rest);
  }

  private now() {
    return moment().format('hh:mm:ss');
  }
}
