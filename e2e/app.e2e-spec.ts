import { EnvironmentManagerPage } from './app.po';

describe('environment-manager App', () => {
  let page: EnvironmentManagerPage;

  beforeEach(() => {
    page = new EnvironmentManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
