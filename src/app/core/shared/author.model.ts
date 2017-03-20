/* Created by Aquariuslt on 2017-03-20. */

/**
 * Author Model
 * Including author name, description, avator
 * Optional: avator background
 * */
export class Author {
  avatorUrl?: string = '';
  author?: string;
  description?: string;

  constructor(data?) {
    let self = this;
    if (data) {
      if (data.avatorUrl) {
        self.avatorUrl = data.avatorUrl;
      }
      if (data.author) {
        self.author = data.author;
      }
      if (data.description) {
        self.description = data.description;
      }
    }
  }
}
