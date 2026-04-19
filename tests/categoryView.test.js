import CategoryView from "../src/js/categoryView.js";
import Storage from "../src/js/storage.js";
import { mountInventoryDom } from "./helpers/inventoryDomFixture.js";

describe("CategoryView", () => {
  beforeEach(() => {
    localStorage.clear();
    mountInventoryDom();
    window.alert = jest.fn();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it("setupApp fills category select from storage", () => {
    Storage.saveCategories([{ id: 1, title: "Books", description: "x" }]);
    const view = new CategoryView();
    view.setupApp();
    const sel = document.querySelector("#categoriesSelect");
    expect(sel.querySelectorAll("option").length).toBeGreaterThanOrEqual(2);
    expect(sel.textContent).toContain("Books");
  });

  it("addNewCategory rejects short title", () => {
    const view = new CategoryView();
    document.querySelector("#categoryTitle").value = "a";
    view.addNewCategory();
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("at least 2 characters"),
    );
  });

  it("addNewCategory runs when Add button is clicked", () => {
    new CategoryView();
    document.querySelector("#categoryTitle").value = "ViaButton";
    document.querySelector("#categoryDescription").value = "d";
    document.querySelector("#categoryAddNewBtn").click();
    expect(Storage.getCategories().length).toBe(1);
    expect(Storage.getCategories()[0].title).toBe("ViaButton");
  });

  it("addNewCategory saves new category", () => {
    const view = new CategoryView();
    document.querySelector("#categoryTitle").value = "Electronics";
    document.querySelector("#categoryDescription").value = "Gadgets";
    view.addNewCategory();
    const saved = Storage.getCategories();
    expect(saved.length).toBe(1);
    expect(saved[0].title).toBe("Electronics");
  });

  it("addNewCategory on duplicate name alerts (storage not re-saved in app code)", () => {
    Storage.saveCategories([{ id: 9, title: "Dup", description: "old" }]);
    const view = new CategoryView();
    document.querySelector("#categoryTitle").value = "Dup";
    document.querySelector("#categoryDescription").value = "new desc";
    view.addNewCategory();
    expect(window.alert).toHaveBeenCalled();
    const saved = Storage.getCategories();
    expect(saved[0].description).toBe("old");
  });

  it("cancel button clears inputs", () => {
    const view = new CategoryView();
    document.querySelector("#categoryTitle").value = "x";
    document.querySelector("#categoryDescription").value = "y";
    document.querySelector("#categoryCanelBtn").click();
    expect(document.querySelector("#categoryTitle").value).toBe(" ");
    expect(document.querySelector("#categoryDescription").value).toBe(" ");
  });
});
