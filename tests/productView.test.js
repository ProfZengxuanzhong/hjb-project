import ProductView from "../src/js/productView.js";
import Storage from "../src/js/storage.js";
import { mountInventoryDom } from "./helpers/inventoryDomFixture.js";

describe("ProductView", () => {
  beforeEach(() => {
    localStorage.clear();
    mountInventoryDom();
    window.alert = jest.fn();
  });

  it("setupApp renders products and applies sort", () => {
    Storage.saveProducts([
      { id: 2, title: "B", quantity: "1", location: "BDG", category: "c", persianDate: "d" },
      { id: 1, title: "A", quantity: "2", location: "BDG", category: "c", persianDate: "d" },
    ]);
    const view = new ProductView();
    view.setupApp();
    const ul = document.querySelector("#productsCenter");
    expect(ul.innerHTML).toContain("A");
    expect(ul.innerHTML).toContain("B");
  });

  it("addNewProduct rejects short title", () => {
    const view = new ProductView();
    document.querySelector("#productTitle").value = "x";
    view.addNewProduct();
    expect(window.alert).toHaveBeenCalled();
  });

  it("addNewProduct runs when Add Product button is clicked", () => {
    new ProductView();
    document.querySelector("#productTitle").value = "ViaBtn";
    document.querySelector("#productLocations").value = "BDG";
    document.querySelector("#addNewProductBtn").click();
    expect(Storage.getProducts.length).toBe(1);
    expect(Storage.getProducts[0].title).toBe("ViaBtn");
  });

  it("addNewProduct saves product", () => {
    const view = new ProductView();
    document.querySelector("#productTitle").value = "Milk";
    document.querySelector("#productLocations").value = "BDG";
    document.querySelector("#categoriesSelect").innerHTML =
      '<option value="Food" selected>Food</option>';
    document.querySelector("#productQuantity").innerText = "3";
    view.addNewProduct();
    const list = Storage.getProducts;
    expect(list.length).toBe(1);
    expect(list[0].title).toBe("Milk");
    expect(list[0].quantity).toBe("3");
  });

  it("toggleProductQty increments and decrements", () => {
    const view = new ProductView();
    const qty = document.querySelector("#productQuantity");
    document.querySelector("#incQty").click();
    expect(qty.innerText).toBe("1");
    document.querySelector("#decQty").click();
    expect(qty.innerText).toBe("0");
  });

  it("search input keyup and sort change use listeners", () => {
    Storage.saveProducts([
      { id: 1, title: "Only", quantity: "1", location: "BDG", category: "c", persianDate: "d" },
    ]);
    const view = new ProductView();
    const search = document.querySelector("#searchInput");
    search.value = "on";
    search.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
    expect(document.querySelector("#productsCenter").innerHTML).toContain("Only");

    const sort = document.querySelector("#sort");
    sort.value = "oldest";
    sort.dispatchEvent(new Event("change", { bubbles: true }));
    expect(document.querySelector("#productsCenter").innerHTML).toContain("Only");
  });

  it("searchProducts filters list", () => {
    Storage.saveProducts([
      { id: 1, title: "Apple", quantity: "1", location: "BDG", category: "F", persianDate: "d" },
      { id: 2, title: "Banana", quantity: "1", location: "BDG", category: "F", persianDate: "d" },
    ]);
    const view = new ProductView();
    view.setupApp();
    view.searchProducts("ban");
    expect(document.querySelector("#productsCenter").innerHTML).toContain("Banana");
    expect(document.querySelector("#productsCenter").innerHTML).not.toContain("Apple");
  });

  it("sortBySelect handles newest, oldest, A-Z, Z-A and default", () => {
    Storage.saveProducts([
      { id: 10, title: "Zed", quantity: "1", location: "BDG", category: "c", persianDate: "d" },
      { id: 5, title: "Amy", quantity: "1", location: "BDG", category: "c", persianDate: "d" },
    ]);
    const view = new ProductView();
    const sort = document.querySelector("#sort");

    sort.value = "oldest";
    view.sortBySelect("oldest");
    let html = document.querySelector("#productsCenter").innerHTML;
    expect(html.indexOf("Amy")).toBeLessThan(html.indexOf("Zed"));

    sort.value = "newest";
    view.sortBySelect("newest");
    html = document.querySelector("#productsCenter").innerHTML;
    expect(html.indexOf("Zed")).toBeLessThan(html.indexOf("Amy"));

    sort.value = "A-Z";
    view.sortBySelect("A-Z");
    html = document.querySelector("#productsCenter").innerHTML;
    expect(html.indexOf("Amy")).toBeLessThan(html.indexOf("Zed"));

    sort.value = "Z-A";
    view.sortBySelect("Z-A");
    html = document.querySelector("#productsCenter").innerHTML;
    expect(html.indexOf("Zed")).toBeLessThan(html.indexOf("Amy"));

    view.sortBySelect("__default__");
    html = document.querySelector("#productsCenter").innerHTML;
    expect(html).toContain("Amy");
    expect(html).toContain("Zed");
  });

  it("deleteProduct removes item", () => {
    Storage.saveProducts([
      { id: 42, title: "X", quantity: "1", location: "BDG", category: "c", persianDate: "d" },
    ]);
    const view = new ProductView();
    view.setupApp();
    document.querySelector(".pdt-dlt-btn").click();
    expect(Storage.getProducts.length).toBe(0);
  });
});
