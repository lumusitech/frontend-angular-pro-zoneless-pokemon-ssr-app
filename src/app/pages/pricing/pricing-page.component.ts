import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      //do something only for the client side
      document.title = 'Pricing page';
    }

    if (isPlatformServer(this.platform)) {
      //do something only for the server side
    }

    //? Better
    this.title.setTitle('Pricing page');
    this.meta.updateTag({
      name: 'description',
      content: 'This is my pricing page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'angular,project,ssr,zoneless,lumusitech',
    });
  }
}
