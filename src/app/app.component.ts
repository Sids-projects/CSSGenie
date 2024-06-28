import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CSSGenie';
  isDarkTheme: boolean = false;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  toggleTheme() {
    this.isDarkTheme = true;
    this.renderer.addClass(document.body, 'dark-theme');
  }
}
