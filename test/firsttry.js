



const owner = {
    "email": "tester1@test.com",
    "password": "tester1"
}

const stationAdmin = {
    "email": "hadjichristofi@bitsplease.com",
    "password": "codeH"
}

const chargeData = {
    "owner_id": "1",
    "car_license_plate": "ZXY1274",
    "charging_point_id": "1",
    "charging_station_id": "1",
    "connection_time": "2021-03-14T05:05",
    "disconnect_time": "2021-03-14T10:10",
    "kWh_delivered": "101.667",
    "protocol": "normal(20kW)",
    "payment": "card",
    "cost": "12.71",
    "vehicle_type": "bev",
    "rating": "5"
}

const changeRating = {
    "session_id": "5",
    "rating": "4"
}

let token;

/* Test charge completed route */
let resMsg;
describe('Test charge completed route (POST: {baseurl}/charge/completed)', () => {
    it('Should return status 201', (done) => {
        request(app)
            .post('/evcharge/api/login')
            .send(owner)
            .end((err, res) => {
                token = res.body.token;
                request(app)
                    .post('/evcharge/api/charge/completed')
                    .set('X-OBSERVATORY-AUTH', token)
                    .send(chargeData)
                    .end((err, res) => {
                        resMsg = res.body.message;
                        expect(res.status).to.eq(201);
                        done()
                    })
            })
    })
    it('Should return message: \"Sessions record created!\"', () => {
        expect(resMsg).to.eq('Sessions record created!')
    })
})