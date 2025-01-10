import request from "supertest"
import app from "../app"

require("dotenv").config();

describe("GET /movies/year/YYYY", () => {
    it("should return expected response", async () => {
        const res : any = await request(app).get('/movies/year/1977')
        expect(res.statusCode).toEqual(200)
        expect(res.headers['content-type']).toMatch(/json/)
    })
})
