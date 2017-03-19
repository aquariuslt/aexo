///<reference path="../../../../node_modules/@angular/core/src/animation/metadata.d.ts"/>
import {Component, animate, trigger, transition, style, state, OnInit} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {NavigationMenuService} from "../shared/navigation-menu.service";
import {NavigationMenu} from "../shared/navigation-menu.model";
import * as _ from "lodash";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('sideNavState', [
      state('show', style({
        'z-index': 1000
      })),
      state('hide', style({
        display: 'none'
      })),
      transition('hide => show', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ])
    ]),
    trigger('sideNavMarkState', [
      state('hide', style({
        display: 'none'
      })),
      state('show', style({
        'z-index': 1000
      })),
      transition('hide => show', [
        style({
          opacity: 0
        }),
        animate('0.1s 0.2s ease-in')
      ])
    ]),
    trigger('menuOpenState',[
      state('opened', style({
        transform: 'rotate(0deg)'
      })),
      state('closed', style({
        transform: 'rotate(180deg)'
      })),
      transition('closed => opened', [
        animate('0.5s ease-out')
      ]),
      transition('opened => closed', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('subMenuExpandState',[
      state('opened', style({
        height: '*'
      })),
      state('closed', style({
        height: 0,
        opacity: 0,
      })),
      transition('closed => opened', [
        animate('0.5s ease-out', style({
          height: '*',
          opacity: 100
        }))
      ]),
      transition('opened => closed', [
        animate('0.5s ease-out', style({
          height: 0,
          opacity: 0
        }))
      ])
    ])
  ]
})
export class NavigationComponent implements OnInit {

  private sideNavState = 'hide';
  private menus: Array<NavigationMenu> = [];
  private menuOpenStates = [];


  private logger = this.logFactory.getLog(NavigationComponent.name);

  constructor(private logFactory: LogFactory,
              private navigationMenuService: NavigationMenuService) {
  }

  ngOnInit() {
    let vm = this;
    vm.navigationMenuService.getMenus()
      .subscribe(
        function next(data) {
          vm.menus.push(data);
          vm.menuOpenStates = vm.menus.map(() => {
            return 'closed';
          });
        }
      );

  }


  toggleSideNavState(): void {
    let vm = this;
    vm.sideNavState = vm.sideNavState == 'show' ? 'hide' : 'show';
  }

  toggleMenuOpenState(index: number): void {
    let vm = this;
    if (index <= vm.menuOpenStates.length) {
      vm.menuOpenStates[index] = _.isEqual(vm.menuOpenStates[index], 'opened') ? 'closed' : 'opened';
      vm.logger.info('Toggle menu:' + index + ':' + vm.menuOpenStates[index]);
    }
  }

}
