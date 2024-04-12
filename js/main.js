// search
// clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mod = "create";
let tmp;

// get totla
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

// create product
let dataPro;
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.getItem("products"));
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mod === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mod = "craete";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("products", JSON.stringify(dataPro));

  clearData();
  showData();
};

// clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read

function showData() {
  getTotal();

  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
      </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick = "deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();

// delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(dataPro));
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// update

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();

  count.style.display = "none";

  submit.innerHTML = "Update";

  mod = "update";

  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search

let searchMod = "title";

function getSearchMod(id) {
  let search = document.getElementById("search");

  if (id === "searchTitle") {
    searchMod = "title";
  } else {
    searchMod = "category";
  }
      search.placeholder = "Search by" + " " + searchMod;

  search.focus();

  search.value = ""
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMod === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
      </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
      </tr>
    `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
