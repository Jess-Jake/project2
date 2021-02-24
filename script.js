/**
 *
 * I don't know what to cook!
 *
 * app heading.
 * " I don't know what to cook!"
 * 
 * namespace
 *
 * input form where the user can add ingredients that they have.
 *
 * show the ingredients list below the form.
 *
 * delete button beside of the ingredients list so user can edit.
 *
 * listen to a button click event to generate the recipe.
 * :get ingredients input value & generate random menu -> send them to the API
 *
 * receive recipe data from API -> display the recipe with ingredients that user might have to buy
 *
 * a button where user can see different option (recipe)
 *
 */


//namespace
const recipeApp = {};
recipeApp.localStorage = "ingredient";
recipeApp.ingredStorageArray = [];

//save relevant API information
recipeApp.apiUrl = 'https://api.edamam.com/search'; 
recipeApp.apiKey = '293c08c7945e511e5cb756b37b0c5179';

recipeApp.addIngred = () => {
    const ingredients = document.querySelector("#ingredient");
    const addButton = document.querySelector(".add-button");


    addButton.addEventListener("click", (e) =>{
        e.preventDefault();
        const storage = document.querySelector("#storage");
        const storageList = document.createElement("li");
        storageList.innerHTML = `<i class="fas fa-dot-circle"></i>${ingredients.value}`;

        if (ingredients.value) {
        storage.appendChild(storageList);
        recipeApp.ingredStorageArray.push(ingredients.value);
        ingredients.value = '';
        }else {
            alert("please tell us what is in your fridge");
            ingredients.focus();
        }
        recipeApp.setLocalStorage();
    })
   
}

recipeApp.submitButton = () => {
    const submitButton = document.querySelector(".submit-button");
    const recipeName = document.querySelector('.recipe-label');
    const recipeImage = document.getElementById('recipe-image');
    const ingredientUl = document.querySelector('.recipe');

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        recipeName.textContent = '';
        recipeImage.src = '';
        recipeImage.alt = '';
        ingredientUl.innerHTML = '';

        const ingredList = document.querySelectorAll('li');
        const randomNumber = Math.floor(Math.random() * ingredList.length);
        if (ingredList[randomNumber]) {
            recipeApp.getRecipe((ingredList[randomNumber]).textContent);
        }else {
            alert("please tell us what is in your fridge");
            const ingredients = document.querySelector("#ingredient");
            ingredients.focus();
        }
    })
}

//create a method which requests informtion from the API
recipeApp.getRecipe = (ingredient) => {
    //use URL constructor to specify the parameters we wish to include in our API endpoint
    const url = new URL(recipeApp.apiUrl);
    url.search = new URLSearchParams({
        q: ingredient,
        app_id: 'e941670e',
        app_key: recipeApp.apiKey
    });

    fetch(url)
        .then((response) => {
            //parse this response into JSON and return
            return response.json();
        })
        //parse the JSON promise response and log out readable data
        .then((jsonResponse) => {
            
            const randomNumber = Math.floor(Math.random()*10);
            jsonResponse.hits[randomNumber].recipe;
            console.log(jsonResponse.hits[randomNumber]);
            
            //pass the data into the displayPhotos method
            recipeApp.displayRecipe(jsonResponse.hits[randomNumber].recipe);
            
        });
};


recipeApp.displayRecipe = (menu) => {
    const recipeName = document.querySelector('.recipe-label');
    const recipeImage = document.getElementById('recipe-image');
    const ingredientUl = document.querySelector('.recipe');
    
    recipeName.textContent = menu.label;

    console.log(recipeName);
    
    recipeImage.src=menu.image;
    recipeImage.alt=menu.label;
    recipeImage.style.border = '2px solid grey'

    menu.ingredientLines.forEach (ingred => {
        const ingredList = document.createElement('li');
        
        ingredList.textContent = ingred;
        ingredList.innerHTML = `<i class="fas fa-dot-circle"></i>${ingred}`;
        ingredientUl.appendChild(ingredList);   
    })

    const link = document.createElement('button');
    link.innerHTML = `<a href="${menu.url}">Go to Recipe</a>`;

    ingredientUl.appendChild(link);
    console.log(menu);
};

recipeApp.setLocalStorage = () => {
    localStorage.setItem(recipeApp.localStorage, JSON.stringify(recipeApp.ingredStorageArray));
}

recipeApp.getLocalStorage = () => {
    const loadedIngred = localStorage.getItem(recipeApp.localStorage);
    const storage = document.querySelector("#storage");
    console.log(typeof (JSON.parse(loadedIngred)));

    if (loadedIngred) {
        const parsedIngred = JSON.parse(loadedIngred);
        parsedIngred.forEach(ingred => {
            const storageList = document.createElement("li");
            storageList.innerHTML = `<i class="fas fa-dot-circle"></i>${ingred}`;
            storage.appendChild(storageList);
            recipeApp.ingredStorageArray.push(ingred);
        })
    }
}

recipeApp.init = () => {
    recipeApp.getLocalStorage();
    recipeApp.addIngred();
    recipeApp.submitButton();
};



recipeApp.init();