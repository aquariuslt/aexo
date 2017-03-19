import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationComponent} from "./navigation/navigation.component";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";
import {MaterialModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {NavigationMenuService} from "./shared/navigation-menu.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CovalentCoreModule,
    CovalentLayoutModule,
  ],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
    NavigationMenuService
  ]
})
export class CoreModule {
}
