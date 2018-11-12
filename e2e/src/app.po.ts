import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToMain() {
    return browser.get('/main');
  }

  //element(by.css('input[id=]')).sendKeys();
  //

  // Function to regist a new user
  register(username, email, phone, dob, zipcode, password, repwd){
    element(by.css('input[id=account]')).sendKeys(username);
    browser.sleep(400);
    element(by.css('input[id=email]')).sendKeys(email);
    browser.sleep(400);
    element(by.css('input[id=phone]')).sendKeys(phone);
    browser.sleep(400);
    element(by.css('input[id=birth]')).sendKeys(dob);
    browser.sleep(400);
    element(by.css('input[id=zipcode]')).sendKeys(zipcode);
    browser.sleep(400);
    element(by.css('input[id=pwd]')).sendKeys(password);
    browser.sleep(400);
    element(by.css('input[id=repwd]')).sendKeys(repwd);
    browser.sleep(400);
    element(by.css('button[id=regi_btn]')).click();
    browser.sleep(400);
    expect(element(by.id('regi_btn')).isEnabled()).toBe(true);
  }
  
  // Function to login current user
  login(username, password){
    element(by.css('input[id=login-username]')).sendKeys(username);
    element(by.css('input[id=login-pwd]')).sendKeys(password);
    element(by.css('button[id=usr_login_btn]')).click();
  }

  // Function to add new post
  addPost(post){
    element(by.css('textarea[id=add_new_post]')).sendKeys(post);
    element(by.css('button[id=share_new_post]')).click();
    browser.sleep(700);
    //expect(element.all(by.css('span[id=post_id]')).get(0).getText()).toEqual(post);
  }

  // Function to return posts
  getPost(){
    return element.all(by.css('span[id=post_id]')).getText();
  }

  // Function to update headline
  updateHeadline(headline){
    element(by.css('div[id=user_headline_click]')).click();
    element(by.css('textarea[id=user_headline_update]')).clear();
    element(by.css('textarea[id=user_headline_update]')).sendKeys(headline);
    browser.sleep(700);
    element(by.css('button[id=user_headline_update_btn]')).click();
    browser.sleep(700);
    expect(element(by.css('span[id=user_headline]')).getText()).toEqual(headline);
  }


  // Function to log out
  logout(){
    element(by.css('span[id=log_out_btn]')).click();
  }

  // Function to search
  search(word){
    element(by.css('textarea[id=search_content]')).sendKeys(word);
    browser.sleep(700);
    element(by.css('button[id=post_search_btn]')).click();
    browser.sleep(700);
  }

  // Function to get post author
  getAuthor(){
    return element.all(by.css('span[id=post_author]'));
  }
}
