import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';

describe('MainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  /*
  it('should be created', () => {
    const service: MainService = TestBed.get(MainService);
    expect(service).toBeTruthy();
  });
  */

  const postList = [
    {"author": "harlan0103", "title": "Brett Kavanaugh: Key test vote on Supreme Court nominee passes", "time": "", "img": "", "article": "dummy", "comment":""},
    {"author": "harlan0103", "title": "Kyrie: 'I plan on re-signing' with Celtics", "time": "", "img": "", "article": "dummy", "comment":""},
    {"author": "harlan0103", "title": "Khabib Nurmagomedov-Conor McGregor set to smash records", "time": "", "img": "", "article": "dummy", "comment":""},
    {"author": "MusicCzar", "title": "Highlights: Barcelona among perfect four, Neymar hat-trick", "time": "", "img": "", "article": "dummy", "comment":""},
    {"author": "Ecophobia", "title": "Warriors' Patrick McCaw to decline 2-year, $5.2 million extension", "time": "", "img": "", "article": "dummy", "comment":""},
    {"author": "Tony_Stark", "title": "FIFA 19 PLAYER RATINGS — TOP 10 PASSERS", "time": "", "img": "", "article": "dummy", "comment":""}
  ];
  /**
   * should log out a user
   * Call the service function to log out a user
   */
  it('should log out a user (login state should be cleared)', () => {
    const service: MainService = TestBed.get(MainService);
    // Set currentUser
    localStorage.setItem("currentUser", "testUser");
    // Then log out current user
    service.logOutUser();
    // We expect the current user is "" after user logged out
    expect(localStorage.getItem("currentUser")).toBe("");
  });

  /**
   * should filter displayed articles by the search keyword
   * Call the searchKeyWord function to to return a list of posts containing the search keyword
   * Then compare to the expect value
   */
  it('should filter displayed articles by the search keyword', () => {
    const service: MainService = TestBed.get(MainService);
    const testSearch = "Barcelona";
    const toBeResult = {"title": "Highlights: Barcelona among perfect four, Neymar hat-trick"};
    // Search for the articles contains key word "Barcelona"
    let res = service.searchKeyWord(testSearch, postList);
    for(let i = 0; i < res.length; i++){
      expect(res[i].title).toBe(toBeResult);
    }
  });

  it('should update the search keyword', () => {
    const service: MainService = TestBed.get(MainService);
    let testSearch = "Barcelona";
    let toBeResult = {"title": "Highlights: Barcelona among perfect four, Neymar hat-trick"};
    // Search for the articles contains key word "Barcelona"
    let res = service.searchKeyWord(testSearch, postList);
    for(let i = 0; i < res.length; i++){
      expect(res[i].title).toBe(toBeResult);
    }

    // Change to different testcase and test the search keyword is updated
    testSearch = "harlan0103";
    let Result = [
      {"author": "harlan0103", "title": "Brett Kavanaugh: Key test vote on Supreme Court nominee passes", "time": "", "img": "", "article": "dummy"},
      {"author": "harlan0103", "title": "Kyrie: 'I plan on re-signing' with Celtics", "time": "", "img": "", "article": "dummy"},
      {"author": "harlan0103", "title": "Khabib Nurmagomedov-Conor McGregor set to smash records", "time": "", "img": "", "article": "dummy"},
    ]
    res = service.searchKeyWord(testSearch, postList);
    for(let i = 0; i < res.length; i++){
      expect(res[i].author).toBe(Result[i].author);
      expect(res[i].title).toBe(Result[i].title);
      expect(res[i].article).toBe(Result[i].article);
    }

  });

});
