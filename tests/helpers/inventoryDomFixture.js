/** Minimal DOM matching selectors used by CategoryView + ProductView */
export function mountInventoryDom() {
  document.body.innerHTML = `
    <input id="categoryTitle" />
    <textarea id="categoryDescription"></textarea>
    <button type="button" id="categoryCanelBtn"></button>
    <button type="button" id="categoryAddNewBtn"></button>

    <input id="productTitle" />
    <button type="button" id="decQty" class="toggleBtn"></button>
    <p id="productQuantity">0</p>
    <button type="button" id="incQty" class="toggleBtn"></button>
    <select id="productLocations">
      <option value="none">-</option>
      <option value="BDG">BDG</option>
    </select>
    <select id="categoriesSelect">
      <option selected value="none">-</option>
    </select>
    <button type="button" id="addNewProductBtn"></button>
    <ul id="productsCenter"></ul>
    <input id="searchInput" />
    <select id="sort">
      <option value="newest" selected>Newest</option>
      <option value="oldest">Oldest</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
  `;
}
