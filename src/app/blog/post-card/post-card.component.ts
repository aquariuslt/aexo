///<reference path="../shared/post.model.ts"/>
import {Component, OnInit, Input} from "@angular/core";
import {Post} from "../shared/post.model";
import {LogFactory} from "../../shared/log.factory";

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  constructor(private logFactory: LogFactory) {
  }

  @Input() data;

  private logger = this.logFactory.getLog(PostCardComponent.name);
  private post: Post;

  ngOnInit() {
    let vm = this;
    vm.loadPostData();
  }

  loadPostData() {
    let vm = this;
    vm.post = new Post(vm.data);

  }

}


