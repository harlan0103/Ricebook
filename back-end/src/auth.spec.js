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
				username: "testuser2", 
				password: "123456"
			})
			//body: {username: "testuser2", password: "123456"}
		}).then(r => r.json()).then(r => {
			console.log("Unit test to validate POST /login")
			let response = r;
			// response should be: { username: user, result: "success" }
			expect(response.username).toBe("testuser2");
			expect(response.result).toBe("success");
			done();
		});
	});

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

	/*
	Unit test to validate PUT /logout
	Log out the current user and clear cookie and sessions
	
	it('should log out current user', (done) => {
		fetch(url('/logout'), {
			method: 'GET',
			headers: myHeaders,
		}).then(r => r.json()).then(r => {
			let response = r;
			console.log(response);
			done();
		});
	});	
	*/
});