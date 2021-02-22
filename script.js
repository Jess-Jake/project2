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

//save relevant API information
recipeApp.apiUrl = 'https://api.edamam.com/search'; 
recipeApp.apiKey = '293c08c7945e511e5cb756b37b0c5179';

recipeApp.addIngred = () => {
    const ingredients = document.querySelector("#ingredient");
    const addButton = document.querySelector(".addButton");


    addButton.addEventListener("click", (e) =>{
        e.preventDefault();
        const storage = document.querySelector("#storage");
        const storageList = document.createElement("li");
        storageList.innerHTML = ingredients.value;

        if (ingredients.value) {
        storage.appendChild(storageList); 
        ingredients.value = '';
        }else {
            alert("please tell us what is in your fidge");
            ingredients.focus();
        }
    })
   
}

//create a method which requests informtion from the API
recipeApp.getRecipe = () => {

    //use URL constructor to specify the parameters we wish to include in our API endpoint
    const url = new URL(recipeApp.apiUrl);
    url.search = new URLSearchParams({
        q: 'chicken, onions',
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
            jsonResponse.hits[randomNumber].recipe.label;
            console.log(jsonResponse.hits[randomNumber].recipe.label);
            //pass the data into the displayPhotos method
        });
};

recipeApp.displayRecipe = () => {
    const recipeName = document.querySelector('h2');
    const ingredientList = document.querySelector('ul');
};

recipeApp.init = () => {
    recipeApp.addIngred();
    recipeApp.getRecipe();

};



recipeApp.init();