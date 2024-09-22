import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      //do something only for the client side
      document.title = 'Contact page';
    }

    if (isPlatformServer(this.platform)) {
      //do something only for the server side
    }

    //? Better
    this.title.setTitle('Contact page');

    this.meta.updateTag({
      name: 'description',
      content: 'This is my about page',
    });

    this.meta.updateTag({ name: 'og:title', content: 'About page' });

    this.meta.updateTag({
      name: 'keywords',
      content: 'angular,project,ssr,zoneless,lumusitech',
    });
  }
}
