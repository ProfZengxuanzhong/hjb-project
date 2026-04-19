import { mountInventoryDom } from "./helpers/inventoryDomFixture.js";
import Storage from "../src/js/storage.js";

describe("app bootstrap", () => {
  beforeEach(() => {
    localStorage.clear();
    mountInventoryDom();
    window.alert = jest.fn();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it("runs CategoryView + ProductView setup on DOMContentLoaded", async () => {
    Storage.saveCategories([{ id: 1, title: "Cat", description: "d" }]);
    Storage.saveProducts([
      { id: 1, title: "P", quantity: "1", location: "BDG", category: "Cat", persianDate: "d" },
    ]);

    jest.resetModules();
    await import("../src/js/app.js");
    document.dispatchEvent(new Event("DOMContentLoaded"));

    expect(document.querySelector("#categoriesSelect").textContent).toContain("Cat");
    expect(document.querySelector("#productsCenter").innerHTML).toContain("P");
  });
});
