/*
Test suit for profile.js
*/
const fetch = require('isomorphic-fetch');
const url = path => `http://localhost:3000${path}`

describe('Validation for auth.js', () => {
	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	/*
	Unit test to validate GET /headlines
	Should return the current user's headline
	*/
	it('Should return user headline', (done) => {
		fetch(url('/login'), {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				username: "testuser2", 
				password: "123456"
			})
		}).then(r => r.json()).then(r => {
			let response = r;
			expect(response.username).toBe("testuser2");
			expect(response.result).toBe("success");

			// ERROR?
			fetch(url('/headlines'), {
				method: 'GET',
				headers: myHeaders
			}).then(r => r.json()).then(r => {
				console.log(r)
				done();
			});
		});
	});
});