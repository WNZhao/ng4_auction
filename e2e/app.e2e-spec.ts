import { Auctionv1Page } from './app.po';

describe('auctionv1 App', () => {
  let page: Auctionv1Page;

  beforeEach(() => {
    page = new Auctionv1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
