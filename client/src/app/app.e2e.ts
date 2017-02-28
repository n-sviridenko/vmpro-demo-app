import { browser, element, by } from 'protractor';

describe('App', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should be a home', () => {
    const header = element(by.css('h1'));

    expect(header.getText()).toBe('Page not found');
  });
});
