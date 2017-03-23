import {Component, OnInit} from "@angular/core";
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {Params, ActivatedRoute} from "@angular/router";
import {LogFactory} from "../../shared/log.factory";
import {PostService} from "../shared/post.service";
import "rxjs/add/operator/switchMap";
import {Post} from "../shared/post.model";
import marked from "marked";
import * as _ from "lodash";
import {BlogTitleService} from "../shared/blog-title.service";
import {BlogConfigService} from "../shared/blog-config.service";

@Component({
  providers: [
    BlogConfigService,
    PostService,
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  private logger = this.logFactory.getLog(PostDetailComponent.name);
  private post: Post = new Post();
  private postHtmlContent: string;
  private disqusConfig;
  private disqus;
  private postLink;

  constructor(private logFactory: LogFactory,
              private blogConfigService: BlogConfigService,
              private titleService: BlogTitleService,
              private posts: PostService,
              private route: ActivatedRoute,
              private location: Location) {
    let vm = this;
  }


  ngOnInit() {
    let vm = this;
    vm.loadDisqusConfig();
    vm.loadPostDetail();
  }

  loadDisqusConfig() {
    let vm = this;
    vm.blogConfigService.getDisqusConfig()
      .subscribe(function (disqusConfig) {
        vm.disqusConfig = disqusConfig;
      });
  }

  loadPostDetail() {
    let vm = this;
    vm.route.params.switchMap(function (params: Params) {
      let year = params['year'];
      let month = params['month'];
      let date = params['date'];
      let postName = params['postName'];
      let link = year + '/' + month + '/' + date + '/' + postName;
      vm.logger.info('Post Link:', link);
      vm.postLink = link.replace(/\//g, '-');
      return vm.posts.getPost(link);
    }).subscribe(function (post) {
      vm.post = new Post(post);
      vm.logger.info('Load Post:', vm.post.title);
      vm.titleService.setTitle(vm.post.title);
      vm.renderPostContent();
      vm.renderDisqusContent();
    });
  }

  renderPostContent() {
    let vm = this;
    let tokens = vm.post.tokens;
    tokens.links = {};
    vm.postHtmlContent = marked.parser(tokens);
  }

  renderDisqusContent() {
    let vm = this;
    if (!_.isUndefined(vm.disqusConfig) && !_.isUndefined(vm.disqusConfig.enable) && _.isEqual(vm.disqusConfig.enable, true)) {
      let url = location.protocol + '//' + location.hostname + vm.location.path();
      vm.disqus = {
        enable: true,
        shortName: vm.disqusConfig.shortName,
        identifier: vm.postLink,
        url: url
      };
      vm.logger.info('Load Disqus Config:', vm.disqus);
    }
  }
}
