const supertest = require("supertest");
const server = require("./index");
const db = require("./data/config");

beforeEach(async () => {
    await db.seed.run();
});

test("Welcome route", async () => {
    const res = await supertest(server).get("/");

    expect(res.status).toBe(200);

    expect(res.type).toBe("application/json");

    expect(res.body.message).toBe("Welcome to our API !");
});

test("Create Animal", async () => {
    const res = await supertest(server).post("/").send({Name: "Jordan", Species: "Lion"});

    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body).toEqual({id: 4, Name: "Jordan", Species: "Lion"});
})

test("Get Animals", async () => {
    const res = await supertest(server).get("/all");

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.length).toBeGreaterThan(1);
    expect(res.body[0].id).toBe(1);
    expect(res.body[0].Name).toMatch(/johnny/i);
})

test("remove animal", async () => {
    const deleted = await supertest(server).delete("/1");
    const res = await supertest(server).get("/all");

    expect(deleted.status).toBe(204);
    // dont think this works due to the 204 status code
    // expect(deleted.body.message).toBe("Successfully deleted");
    expect(res.body).toHaveLength(2);
    
})

test("update animal", async () => {
    const updated = await supertest(server).put("/1").send({Name: "John", Species: "Elephant"});

    expect(updated.status).toBe(200);
    expect(updated.type).toBe("application/json");
    expect(updated.body.Name).toMatch(/john/i);
})