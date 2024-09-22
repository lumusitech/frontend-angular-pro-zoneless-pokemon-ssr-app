import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  ngOnInit(): void {
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
