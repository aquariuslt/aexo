///<reference path="../../../../node_modules/@angular/core/src/animation/metadata.d.ts"/>
import {Component, animate, trigger, transition, style, state, OnInit} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {NavigationMenuService} from "../shared/navigation-menu.service";
import {NavigationMenu} from "../shared/navigation-menu.model";

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
  ]
})
export class NavigationComponent implements OnInit {

  private sideNavState = 'hide';
  private menus: Array<NavigationMenu> = [];
  private menuOpenStates = [false, false];

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
          vm.logger.info('Now menus:',vm.menus);
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
      vm.menuOpenStates[index] = !vm.menuOpenStates[index];
    }
  }

}
