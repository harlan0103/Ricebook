/*
Test suit for auth.js
*/
const fetch = require('isomorphic-fetch');
const url = path => `http://localhost:3000${path}`

describe('Validation for auth.js', () => {
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	/*
	Unit test to validate POST /login
	Login with exist user should return the success message
	*/
	it('should log in a exist user', (done) => {
		fetch(url('/login'), {
			method: 'POST',
			headers: myHeaders,
			// This is the body for the post content
			body: JSON.stringify({
				username: "testUser",
				password: "123"
			}),
			credentials: 'include'
		}).then(r => r.json()).then(r => {
			console.log("Unit test to validate POST /login")
			let response = r;
			// response should be: { username: user, result: "success" }
			expect(response.username).toBe("testUser");
			expect(response.result).toBe("success");
			done();
		});
	});
	//////////////////////////////////////////////////////
	
	/*
	Unit test to validate POST /register
	Regist a new user
	*/
	it('should regist new user', (done) => {
		fetch(url('/register'), {
			method: 'POST',
			headers: myHeaders,
			// This is the body for the post content
			body: JSON.stringify({
				username: "unit-test-register",
				password: "123456",
				email: "test@rice.edu",
				dob: "1999-09-19",
				zipcode: "12345"
			})
		}).then(r => r.json()).then(r => {
			console.log("Unit test to validate POST /register")
			let response = r;
			// response should be: { result: "success", username: "username" }
			expect(response.status).toBe("success");
			expect(response.username).toBe("unit-test-register");
			done();
		});
	});
	//////////////////////////////////////////////////////

	/*
	Unit test to validate PUT /logout
	Log out the current user and clear cookie and sessions
	*/
	it('Should log out current user', (done) => {
		fetch(url('/logout'), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
    			'Access-Control-Allow-Credentials': 'true'
			},
			// This is the body for the post content
			body: JSON.stringify({
				username: "testUser",
				password: "123"
			}),
			credentials: 'include'
		}).then(r => {
			//console.log(r.headers.get('set-cookie'));
			const cookie = r.headers.get('set-cookie');
			fetch(url('/logout'), {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookie
				},
				credentials: 'include'
			//}).then( r => r.json()).then( r => {
			}).then( r => {
				console.log("Unit test to validate PUT /logout")
				var response = r
				//console.log(response.status)
				// After logout the status should be 401
				expect(response.status).toBe(401)
				done();
			}).catch(error => {
				console.log(error);
			});
		});
	});
	//////////////////////////////////////////////////////
	
	/*
	Unit test to validate GET /headlines
	Return the current user's headline
	*/
	it('Shoud get current users headline', (done) => {
		fetch(url('/login'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
    			'Access-Control-Allow-Credentials': 'true'
			},
			// This is the body for the post content
			body: JSON.stringify({
				username: "testUser",
				password: "123"
			}),
			credentials: 'include'
		}).then(r => {
			//console.log(r.headers.get('set-cookie'));
			const cookie = r.headers.get('set-cookie');
			fetch(url('/headlines'), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookie
				},
				credentials: 'include'
			}).then( r => r.json()).then( r => {
				console.log("Unit test to validate GET /headlines")
				var response = r.headlines[0];
				expect(response.username).toBe("testUser")
				expect(response.headline).toBe("Welcome to ricebook!")
				done();
			}).catch(error => {
				console.log(error);
			});
		});
	});
	//////////////////////////////////////////////////////

	/*
	Unit test to validate PUT /headline
	Update user headline
	*/
	it('Should update user headline', (done) => {
		fetch(url('/login'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
    			'Access-Control-Allow-Credentials': 'true'
			},
			// This is the body for the post content
			body: JSON.stringify({
				username: "unit-test-register",
				password: "123456"
			}),
			credentials: 'include'
		}).then(r => {
			//console.log(r.headers.get('set-cookie'));
			const cookie = r.headers.get('set-cookie');
			fetch(url('/headline'), {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookie
				},
				// This is the body for the put request
				body: JSON.stringify({
					headline: "This is the new headline"
				}),
				credentials: 'include'
			}).then( r => r.json()).then( r => {
				console.log("Unit test to validate PUT /headline")
				const newHradlineRes = r;
				//console.log(newHradlineRes)
				expect(newHradlineRes.username).toBe("unit-test-register")
				expect(newHradlineRes.headline).toBe("This is the new headline")
				done();
			}).catch(error => {
				console.log(error);
			});
		});
	});
	//////////////////////////////////////////////////////

	/*
	Unit test to validate GET /articles
	Get user's article
	*/
	it('Should return users posts', (done) => {
		fetch(url('/login'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
    			'Access-Control-Allow-Credentials': 'true'
			},
			// This is the body for the post content
			body: JSON.stringify({
				username: "testUser",
				password: "123"
			}),
			credentials: 'include'
		}).then(r => {
			//console.log(r.headers.get('set-cookie'));
			const cookie = r.headers.get('set-cookie');
			fetch(url('/articles'), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookie
				},
				credentials: 'include'
			}).then( r => r.json()).then( r => {
				console.log("Unit test to validate GET /articles")
				const newHradlineRes = r;
				//console.log(newHradlineRes.posts.length)
				expect(newHradlineRes.posts.length).toBe(6);
				done();
			}).catch(error => {
				console.log(error);
			});
		});
	});
	//////////////////////////////////////////////////////

	/*
	Unit test to validate GET /articles/:id?
	Get user's article
	*/
	it('Should return users posts by id', (done) => {
		fetch(url('/login'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
    			'Access-Control-Allow-Credentials': 'true'
			},
			// This is the body for the post content
			body: JSON.stringify({
				username: "testUser",
				password: "123"
			}),
			credentials: 'include'
		}).then(r => {
			//console.log(r.headers.get('set-cookie'));
			const cookie = r.headers.get('set-cookie');
			fetch(url('/articles/1'), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookie
				},
				credentials: 'include'
			}).then( r => r.json()).then( r => {
				console.log("Unit test to validate GET /articles/:id?")
				const newHradlineRes = r
				//console.log(newHradlineRes)
				expect(newHradlineRes[0].id).toBe(1)
				expect(newHradlineRes[0].body).toBe("This is the first post for testUser")
				//expect(newHradlineRes.posts.length).toBe(6);
				done();
			}).catch(error => {
				console.log(error);
			});
		});
	});
	//////////////////////////////////////////////////////

	/*
	Unit test to validate POST /article
	Update user headline
	*/
	it('Should update user headline', (done) => {
		fetch(url('/login'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
    			'Access-Control-Allow-Credentials': 'true'
			},
			// This is the body for the post content
			body: JSON.stringify({
				username: "unit-test-register",
				password: "123456"
			}),
			credentials: 'include'
		}).then(r => {
			//console.log(r.headers.get('set-cookie'));
			const cookie = r.headers.get('set-cookie');
			fetch(url('/article'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Cookie: cookie
				},
				// This is the body for the put request
				body: JSON.stringify({
					"article": "This is the test post for add new post",
					"picture": ""
				}),
				credentials: 'include'
			}).then( r => r.json()).then( r => {
				console.log("Unit test to validate PUT /article")
				const newHradlineRes = r;
				expect(newHradlineRes.posts[0].id).toBe(1)
				done();
			}).catch(error => {
				console.log(error);
			});
		});
	});
	//////////////////////////////////////////////////////
});