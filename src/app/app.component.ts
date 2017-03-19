import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  styles: [],
  template: `
    <navigation></navigation>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Aexo works';
}
