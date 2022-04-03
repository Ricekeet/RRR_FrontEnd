class Recipe {

    constructor(id){
        this.id = id;
        this.authorId;
        this.cuisineId;
        this.name;
        this.creationDate;
        this.servingCount;
        this.story;
        this.difficulty;
        this.imageFile;
    }

    setupRecipeFromJSON(json){
        // TODO: set up the instance internally
    }

    API_AddToDatabase(recipeObj){
        
    }

}
export default Recipe;