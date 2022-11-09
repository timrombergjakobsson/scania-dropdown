import { newE2EPage } from '@stencil/core/testing';

describe('dropdown-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dropdown-component></dropdown-component>');

    const element = await page.find('dropdown-component');
    expect(element).toHaveClass('hydrated');
  });
});
