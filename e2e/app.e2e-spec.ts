import { SpotifyPage } from './app.po';

describe('spotify App', () => {
  let page: SpotifyPage;

  beforeEach(() => {
    page = new SpotifyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
