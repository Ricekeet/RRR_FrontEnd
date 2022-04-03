class Recipe {

    constructor(id){
        this.id = id;
        this.authorId=null;
        this.cuisineId=null;
        this.name=null;
        this.creationDate=null;
        this.servingCount=null;
        this.story=null;
        this.difficulty=null;
        this.imageFile=null;
    }

    setupRecipeFromJSON(json){
        // TODO: set up the instance internally
    }

    API_AddToDatabase(recipeObj){
        
    }

}
export default Recipe;