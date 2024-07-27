const request = require('request');
const url = "http://localhost:5000";

test("ensures messages starts empty", () => {
    const options = {
        url: `${url}/messages`,
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, (err, res, body) => {
        expect(err).toBeFalsy();
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(body).messages).toStrictEqual([]);
    })
})

test("checks that message posting works", () => {
    request.post(`${url}/messages`, { json: { user: "Lucia", message: "Hello!" } }, (err, res, _body) => {
        expect(err).toBeFalsy();
        expect(res.statusCode).toBe(200);
    })
})

test("makes sure the message was actually posted", () => {
    const options = {
        url: `${url}/messages`,
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, (err, res, body) => {
        expect(err).toBeFalsy();
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(body).messages).toStrictEqual(["Lucia: Hello!"]);
    })
})