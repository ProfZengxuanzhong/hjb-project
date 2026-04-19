import Storage from "../src/js/storage.js";

describe("Storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("getProducts returns empty array when nothing stored", () => {
    expect(Storage.getProducts).toEqual([]);
  });

  it("saveProducts and getProducts round-trip", () => {
    const list = [
      { id: 1, title: "A", quantity: "2", location: "BDG", category: "x", persianDate: "1/1/1403" },
    ];
    Storage.saveProducts(list);
    expect(Storage.getProducts).toEqual(list);
  });

  it("getCategories returns empty array when nothing stored", () => {
    expect(Storage.getCategories()).toEqual([]);
  });

  it("saveCategories and getCategories round-trip", () => {
    const categories = [{ id: 10, title: "Books", description: "Reading" }];
    Storage.saveCategories(categories);
    expect(Storage.getCategories()).toEqual(categories);
  });

  it("removeProduct filters out matching id", () => {
    Storage.saveProducts([
      { id: 1, title: "keep" },
      { id: 2, title: "gone" },
    ]);
    Storage.removeProduct(2);
    expect(Storage.getProducts).toEqual([{ id: 1, title: "keep" }]);
  });

  it("removeProduct leaves list unchanged when id not found", () => {
    const list = [{ id: 1, title: "only" }];
    Storage.saveProducts(list);
    Storage.removeProduct(999);
    expect(Storage.getProducts).toEqual(list);
  });
});
