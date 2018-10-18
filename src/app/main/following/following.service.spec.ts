import { TestBed } from '@angular/core/testing';

import { FollowingService } from './following.service';
import { HttpClientModule } from '@angular/common/http';

describe('FollowingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  const postList = [
    {"author": "harlan0103", "title": "Brett Kavanaugh: Key test vote on Supreme Court nominee passes", "time": "Oct 5, 2018", "img": "", "article": "dummy", "comment":""},
    {"author": "harlan0103", "title": "Kyrie: 'I plan on re-signing' with Celtics", "time": "Oct 4, 2018", "img": "", "article": "dummy", "comment":""},
    {"author": "harlan0103", "title": "Khabib Nurmagomedov-Conor McGregor set to smash records", "time": "Oct 3, 2018", "img": "", "article": "dummy", "comment":""},
    {"author": "MusicCzar", "title": "Highlights: Barcelona among perfect four, Neymar hat-trick", "time": "Oct 3, 2018", "img": "", "article": "dummy", "comment":""},
    {"author": "Ecophobia", "title": "Warriors' Patrick McCaw to decline 2-year, $5.2 million extension", "time": "Spt 29, 2018", "img": "", "article": "dummy", "comment":""},
    {"author": "Tony_Stark", "title": "FIFA 19 PLAYER RATINGS — TOP 10 PASSERS", "time": "Spet 28, 2018", "img": "", "article": "dummy", "comment":""}
  ];


  /*
  it('should be created', () => {
    const service: FollowingService = TestBed.get(FollowingService);
    expect(service).toBeTruthy();
  });
  */

  /**
   * Function to return posts of current loggedin user
   */
  it('should fetch articles for current logged in user', () => {
    const service: FollowingService = TestBed.get(FollowingService);
    const currentUser = "harlan0103";
    let userPost = service.getUserPosts(currentUser, postList);
    let toBeList = [
      {"author": "harlan0103", "title": "", "time": "Oct 5, 2018", "img": "", "article": "dummy"},
      {"author": "harlan0103", "title": "", "time": "Oct 4, 2018", "img": "", "article": "dummy"},
      {"author": "harlan0103", "title": "", "time": "Oct 3, 2018", "img": "", "article": "dummy"}
    ];
    for(let i = 0; i < userPost.length; i++){
      expect(userPost[i].author).toBe(toBeList[i].author);
    }
  })

  /**
   * should add articles when adding a following
   * When adding following
   * Add that followng's articles to the current user article
   */
  it('should add articles when adding a following', () => {
    const service: FollowingService = TestBed.get(FollowingService);
    const addFollowing = "Tony_Stark";
    const currentArtcle = [
      {"author": "harlan0103", "title": "Brett Kavanaugh: Key test vote on Supreme Court nominee passes", "time": "Oct 5, 2018", "img": "", "article": "dummy", "comment":""},
      {"author": "harlan0103", "title": "Kyrie: 'I plan on re-signing' with Celtics", "time": "Oct 4, 2018", "img": "", "article": "dummy", "comment":""},
    ];
    let newPostList = service.addPost(addFollowing, currentArtcle, postList);
    const toBeList = [
      {"author": "harlan0103", "title": "Brett Kavanaugh: Key test vote on Supreme Court nominee passes", "time": "Oct 5, 2018", "img": "", "article": "dummy", "comment":""},
      {"author": "harlan0103", "title": "Kyrie: 'I plan on re-signing' with Celtics", "time": "Oct 4, 2018", "img": "", "article": "dummy", "comment":""},
      {"author": "Tony_Stark", "title": "FIFA 19 PLAYER RATINGS — TOP 10 PASSERS", "time": "Spet 28, 2018", "img": "", "article": "dummy", "comment":""}
    ]
    for(let i = 0; i < newPostList.length; i++){
      expect(newPostList[i].author).toBe(toBeList[i].author);
      expect(newPostList[i].title).toBe(toBeList[i].title);
    }
  });

  /**
   * should remove articles when removing a follower
   * When remove a following
   * Remove following's posts from the post list
   */
  it('should remove articles when removing a follower', () => {
    const service: FollowingService = TestBed.get(FollowingService);
    const removeFollowing = "Ecophobia";
    const currentArtcle = [
      {"author": "harlan0103", "title": "Brett Kavanaugh: Key test vote on Supreme Court nominee passes", "time": "Oct 5, 2018", "img": "", "article": "dummy", "comment":""},
      {"author": "Ecophobia", "title": "Warriors' Patrick McCaw to decline 2-year, $5.2 million extension", "time": "Spt 29, 2018", "img": "", "article": "dummy", "comment":""},
      {"author": "harlan0103", "title": "Kyrie: 'I plan on re-signing' with Celtics", "time": "Oct 4, 2018", "img": "", "article": "dummy", "comment":""},
      {"author": "Ecophobia", "title": "Highlights: Barcelona among perfect four, Neymar hat-trick", "time": "Oct 3, 2018", "img": "", "article": "dummy", "comment":""}
    ];
    let newPostList = service.deletePost(removeFollowing, currentArtcle);
    const toBeList = [
      {"author": "harlan0103", "title": "Brett Kavanaugh: Key test vote on Supreme Court nominee passes", "time": "Oct 5, 2018", "img": "", "article": "dummy", "comment":""},
      {"author": "harlan0103", "title": "Kyrie: 'I plan on re-signing' with Celtics", "time": "Oct 4, 2018", "img": "", "article": "dummy", "comment":""},
    ]
    for(let i = 0; i < newPostList.length; i++){
      expect(newPostList[i].author).toBe(toBeList[i].author);
      expect(newPostList[i].title).toBe(toBeList[i].title);
    }
  });
});
