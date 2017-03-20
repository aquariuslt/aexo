/* Created by Aquariuslt on 2017-03-05. */
import * as _ from "lodash";

export class Post {
  /* From response data */
  title: string;
  link: string;
  created: string;
  updated: string;
  tags: Array<any>;
  category: string;
  metadata: any;
  tokens;

  /* Custom convert field*/
  summary: string;

  constructor(data?) {
    if (data) {
      this.fillBuiltInData(data);
      this.fillCalculateData(data);
    }
  }

  private fillBuiltInData(data) {
    this.title = data.title;
    this.link = data.link;
    this.created = data.created;
    this.updated = data.updated;
    this.tags = data.tags;
    this.category = data.category;
    this.metadata = data.metadata;
    this.tokens = data.tokens;
  }

  private fillCalculateData(data) {
    this.fillSummary(data);
  }

  private fillSummary(data) {
    let self = this;
    let tokens = data.tokens;

    let firstSummaryToken = undefined;

    for (let token of tokens) {
      if (token.type == 'paragraph') {
        firstSummaryToken = token;
        break;
      }
    }

    if (!_.isUndefined(firstSummaryToken)) {
      self.summary = firstSummaryToken.text.substring(0, 80);
    }
  }
}