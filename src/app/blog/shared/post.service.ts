import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {LogFactory} from "../../shared/log.factory";
import * as _ from "lodash";
import {BlogConfigService} from "./blog-config.service";

@Injectable()
export class PostService {

  constructor(private http: Http,
              private blogConfigService: BlogConfigService,
              private logFactory: LogFactory) {
    let svc = this;
    svc.preLoadToCache();
  }

  private logger = this.logFactory.getLog(PostService.name);
  private datasource = environment.datasource;
  private filterCategoryList = [];
  private filterTagList = [];

  private preLoadToCache() {
    let svc = this;
    svc.http.get(svc.datasource.posts).share();
    svc.blogConfigService.getConfig()
      .subscribe(function (applicationProperties) {
        if (applicationProperties.blog.categories.filter) {
          svc.filterCategoryList = applicationProperties.blog.categories.hidden;
        }
        if (applicationProperties.blog.tags.filter) {
          svc.filterTagList = applicationProperties.blog.tags.hidden;
        }
      })
  }


  public getFilteredPostList() {
    let svc = this;
    svc.logger.info('Load Posts from:', svc.datasource.posts);
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let allPostData = response.json();
        //check if need filter
        return svc.filterPosts(allPostData);
      });
  }


  public queryByCategoryName(categoryName: string) {
    let svc = this;
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let postList = response.json();

        let queryResultList = [];

        _.each(postList, function (post) {
          if (_.isEqual(post.category, categoryName)) {
            queryResultList.push(post);
          }
        });
        return queryResultList;
      });
  }

  public queryByTagName(tagName: string) {
    let svc = this;
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let postList = response.json();

        let queryResultList = [];

        _.each(postList, function (post) {
          if (_.indexOf(post.tags, tagName) > -1) {
            queryResultList.push(post);
          }
        });
        return queryResultList;
      });
  }

  public getPost(postLink: string) {
    let svc = this;
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let postList = response.json();
        return _.find(postList, {
          link: postLink
        });
      });
  }

  private filterPosts(postList) {
    let svc = this;
    let filterTags = svc.filterTagList;
    let filterCategories = svc.filterCategoryList;


    let filteredPostList = _.filter(postList, function (post: any) {
      let filterFlag = false;

      if (post.category) {
        if (_.indexOf(filterCategories, post.category) > -1) {
          filterFlag = true;
        }
      }

      if (post.tags) {
        _.each(post.tags, function (tag) {
          if (_.indexOf(filterTags, tag) > -1) {
            filterFlag = true;
          }
        });
      }

      return !filterFlag;
    });

    svc.logger.info('Filtered Posts:', filteredPostList.length);
    return filteredPostList;
  }
}
