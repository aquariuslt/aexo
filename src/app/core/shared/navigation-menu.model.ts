/* Created by Aquariuslt on 2017-03-18. */
import {NavigationLink} from "./navigation-link.model";
import * as _ from "lodash";
export class NavigationMenu {

  label: string;
  links: Array<NavigationLink>;

  constructor(data?) {
    let self = this;
    if (data) {
      self.label = data.label;

      self.links = [];
      _.each(data.links, function (link) {
        self.links.push(new NavigationLink(link));
      })
    }
  }


}
