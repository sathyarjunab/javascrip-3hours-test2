let price = document.querySelector("#price");
let name = document.querySelector("#name");
let category = document.querySelector("#category");
let Electronics = document.querySelector("#Electronics");
let Food = document.querySelector("#Food");
let Skincare = document.querySelector("#Skincare");

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/4c10c22cb98742afb6709959b83448e4/appDocument"
    )
    .then((res) => {
      console.log(res.data);
      let arr = res.data;
      for (let data of arr) {
        let list = document.createElement("li");
        let button = document.createElement("button");
        let input = document.createElement("input");
        input.classList = "idOfProduct";
        input.type = "hidden";
        input.value = data._id;
        button.textContent = "Delete";
        button.id = "del";
        list.textContent = `${data.product_price}-${data.product_name}-${data.product_category}`;
        list.appendChild(button);
        list.appendChild(input);
        if (data.product_category == "Electronic") {
          Electronics.appendChild(list);
        } else if (data.product_category == "Food") {
          Food.appendChild(list);
        } else if (data.product_category == "Skincare") {
          Skincare.appendChild(list);
        }
        list.addEventListener("click", (e) => {
          if ((e.target.id = "del")) {
            let id = e.target.nextSibling.value;
            let list = e.target.parentNode;
            let parent = list.parentNode;
            parent.removeChild(list);
            axios
              .delete(
                `https://crudcrud.com/api/4c10c22cb98742afb6709959b83448e4/appDocument/${id}`
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function productAdd(e) {
  e.preventDefault();
  let obj = {
    product_price: price.value,
    product_name: name.value,
    product_category: category.value,
  };
  let list = document.createElement("li");
  let button = document.createElement("button");
  let input = document.createElement("input");
  input.classList = "idOfProduct";
  input.type = "hidden";
  button.textContent = "Delete";
  button.id = "del";
  list.textContent = `${obj.product_price}-${obj.product_name}-${obj.product_category}`;
  list.appendChild(button);
  axios
    .post(
      "https://crudcrud.com/api/4c10c22cb98742afb6709959b83448e4/appDocument",
      obj
    )
    .then((res) => {
      let data = res.data;
      input.value = data._id;
      list.appendChild(input);
      if (data.product_category === "Electronic") {
        Electronics.appendChild(list);
      } else if (data.product_category === "Food") {
        Food.appendChild(list);
      } else if (data.product_category === "Skincare") {
        Skincare.appendChild(list);
      }
      list.addEventListener("click", (e) => {
        if ((e.target.id = "del")) {
          let id = e.target.nextSibling.value;
          let list = e.target.parentNode;
          let parent = list.parentNode;
          parent.removeChild(list);
          axios
            .delete(
              `https://crudcrud.com/api/4c10c22cb98742afb6709959b83448e4/appDocument/${id}`
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
