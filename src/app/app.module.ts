import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {BlogModule} from "./blog/blog.module";
import {CoreModule} from "./core/core.module";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "@angular/material";
import {LogFactory} from "./shared/log.factory";
import {NavigationMenuService} from "./core/shared/navigation-menu.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot([]),
    CovalentCoreModule.forRoot(),
    CovalentLayoutModule.forRoot(),

    CoreModule,
    BlogModule
  ],
  providers: [
    LogFactory,
    NavigationMenuService
  ],
  bootstrap: [
    AppComponent]
})
export class AppModule {
}
