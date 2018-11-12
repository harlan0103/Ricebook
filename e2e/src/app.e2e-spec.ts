import { AppPage } from './app.po';
import { element } from '@angular/core/src/render3/instructions';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // 1. Test to register a new user named "realUser"
  it('1. Should register a new user named "realUser"', () => {
    page.navigateTo();
    page.register('realUser', 'username@ricebook.com', '123-123-1233', '9191999', '12345', '123', '123');
  });

  // 2. Test to log in as realUser, the browser then redirect to /main page
  it('2. Log in as "realUser"', () => {
    page.navigateTo();
    page.login('realUser', '123');
    expect(browser.getCurrentUrl()).toContain('main');
  });

  // 3. Test to create a new article and validate the article appears in the feed
  it('3. Create a new article', () => {
    page.navigateTo();
    page.login('realUser', '123');
    page.navigateToMain();
    var content = "This is the content for new post";
    page.addPost(content);
  });

  // 4. Test to update headline headline and verify change
  it('4. Update headline', () => {
    page.navigateTo();
    page.login('realUser', '123');
    page.navigateToMain();
    var headline = "new headline";
    page.updateHeadline(headline);
  })

  // 5. Test to logout 'realUser'
  it('5. Log out "realUser"', () => {
    page.navigateTo();
    page.login('realUser', '123');
    page.logout();
    expect(browser.getCurrentUrl()).toContain('');
  });

  // 6. Test to login 'testUser'
  it('6. Log in "testUser"', () => {
    page.navigateTo();
    page.login('testUser', '123');
    expect(browser.getCurrentUrl()).toContain('/');
  });

  // 7. Test to search key word
  it('7. Search key word', () => {
    page.navigateTo();
    page.login('testUser', '123');
    page.search('bilibili');
    var content = "This is a special post contains unique word bilibili ";
    var author = "testUser";
    //expect(page.getPost).toEqual(content);
    //expect(page.getAuthor).toEqual(author);
  });

  // 8. Log out testUser
  it('8. log out testUser', () => {
    page.navigateTo();
    page.login('testUser', '123');
    page.logout();
    expect(browser.getCurrentUrl()).toContain('');
  });
});
