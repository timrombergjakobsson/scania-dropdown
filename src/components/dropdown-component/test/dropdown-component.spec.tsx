import { newSpecPage } from '@stencil/core/testing';
import { DropdownComponent } from '../dropdown-component';

describe('dropdown-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DropdownComponent],
      html: `<dropdown-component></dropdown-component>`,
    });
    expect(page.root).toEqualHtml(`
      <dropdown-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dropdown-component>
    `);
  });
});
