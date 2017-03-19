/* Created by Aquariuslt on 2017-03-18. */
import * as _ from "lodash";

export class NavigationLink {

  external: boolean;

  /* External Link Properties*/
  url?: string;

  /* Internal Router Links */
  link?: string;

  /* Common Properties */
  displayName?: string;
  description?: string;


  constructor(data?) {
    let self = this;
    if (data) {
      self.external = !_.isUndefined(data.url);

      self.url = data.url;
      self.link = data.link;
      self.displayName = data.displayName;
      self.description = data.description;
    }
  }
}
