var Name = document.getElementById("movieName");
var Author = document.getElementById("Author");
var Category = document.getElementById("Category");
var Description = document.getElementById("Description");
var Img = document.getElementById("MovieImage");

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var updateIndex ;

var movies = [];

if (localStorage.getItem("Movies") ){
   movies = JSON.parse(localStorage.getItem("Movies") );
   displayMovies(movies);

}

   

function addMovie() {

    

        var movie = {
            name: Name.value,
            author: Author.value,
            category: Category.value,
            description: Description.value,
            img: Img.files[0].name 
        };

        movies.push(movie);

        localStorage.setItem("Movies", JSON.stringify(movies));

        displayMovies(movies);

        resetData();
    };

    


function resetData(){

Name.value = "";
Author.value = "";
Category.value = "";
Description.value = "";
Img.value = "";
}


function displayMovies(targetArray){

var cartona = "";

for(var i = 0; i < targetArray.length; i++){

    cartona += `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="movie-card">
                <div class="movie-image">
                    <img src="./imgs/${targetArray[i].img}" alt="movie">
                </div>
                <div class="movie-content">
                    <h3>${targetArray[i].name}</h3>
                    <div class="author">
                        By ${targetArray[i].author}
                    </div>
                    <div class="category">
                        ${targetArray[i].category}
                    </div>
                    <p>
                        ${targetArray[i].description}
                    </p>
                    <div class="card-buttons d-flex gap-2 mt-4">
                        <button class="btn btn-warning text-white w-50"
                        onclick="returnData(${targetArray.length < movies.length? targetArray[i].oldIndex : i})">
                            <i class="bi bi-pencil-fill"></i>
                            Update
                        </button>
                        <button class="btn btn-danger w-50" 
                        onclick="deleteMovie(${targetArray.length < movies.length? targetArray[i].oldIndex : i})">
                            <i class="bi bi-trash-fill" ></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.querySelector(".movie-list").innerHTML = cartona;
}


function deleteMovie(index){
    movies.splice(index, 1);

    localStorage.setItem("Movies", JSON.stringify(movies));

    displayMovies(movies);
}



function searchMovies(searchInput){

    var searchValue = searchInput.value
     
    var searchlist = [];

     for(var i = 0; i < movies.length; i++){

    if(movies[i].name.toLowerCase().includes(searchValue.toLowerCase())){  

     movies[i].oldIndex = i;

        searchlist.push(movies[i]);

    }

}
    displayMovies(searchlist);
}




function returnData(index){
 
updateIndex = index;


Name.value = movies[index].name;
Author.value = movies[index].author;
Category.value = movies[index].category;
Description.value = movies[index].description;


 addBtn.classList.add("d-none");
 updateBtn.classList.remove("d-none");

}




function updateMovie(){

movies[updateIndex].name = Name.value;
movies[updateIndex].author = Author.value;
movies[updateIndex].category = Category.value;
movies[updateIndex].description = Description.value;
 
if (Img.files.length > 0) {
    movies[updateIndex].img = Img.files[0].name;
}

localStorage.setItem("Movies", JSON.stringify(movies));

displayMovies(movies);

resetData();

addBtn.classList.remove("d-none");
updateBtn.classList.add("d-none");
}