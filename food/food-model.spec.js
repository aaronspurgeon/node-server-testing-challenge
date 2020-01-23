const db = require("../data/config");
const foodModel = require("./food-model");

beforeEach(async () => {
  await db.seed.run();
});

describe("food model", () => {
  test("list", async () => {
    const res = await foodModel.list();
    expect(res).toHaveLength(3);
  });

  test("find by id", async () => {
    const res = await foodModel.findById(1);
    expect(res.name).toBe("apple");
  });

  test("insert", async () => {
    await foodModel.insert({ name: "peanuts" });
    const food = await db("food").select();
    expect(food).toHaveLength(4);
  });

  test("update", async () => {
    await foodModel.update(1, { name: "applesauce" });
    const food = await foodModel.findById(1);
    expect(food.name).toBe("applesauce");
  });

  test("remove", async () => {
    await foodModel.remove(1);
    const food = await foodModel.list();
    expect(food).toHaveLength(2);
  });
});
