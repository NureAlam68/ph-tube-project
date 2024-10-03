// Fetch, Load and Show Categories on html

// create loadCategories

const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// create displayCategories
const displayCategories = (categories) => {
    // where button add
    const categoryContainer = document.getElementById('categories');
    // get category from categories
    // console.log(categories);
    categories.forEach((item) => {
        // console.log(item);
        // create a button
        const button = document.createElement('button');
        button.classList = "btn";
        button.innerText = item.category;

        // add button to category container
        categoryContainer.append(button);
    });
};

loadCategories();