const model = require("./animals-model");
const db = require("../data/config");

beforeEach(async () => {
    await db.seed.run();
});

describe("Animals Model", () => {
    test("find", async () => {
        const res = await model.find();
        expect(res).toHaveLength(3);
    })

    test("findById", async () => {
        const res = await model.findById(1);
        expect(res.Name).toBe("Johnny");
    })

    test("add", async () => {
        await model.add({Name: "James", Species: "Snake"});
        const res = await model.find();

        expect(res).toHaveLength(4);
    })

    test("remove", async () => {
        await model.remove(1);
        const res = await model.find();
        expect(res).toHaveLength(2);
    })
});