import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name: 'description',
      content: 'This is my Contact Page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact Page',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular,Course,SSR',
    });
  }
}
