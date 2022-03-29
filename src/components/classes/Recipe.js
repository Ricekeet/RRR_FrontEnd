class Recipe {

    constructor(id){
        this.id = id;
        this.authorId = null;
        this.reviews = [];
        this.title = "";
        this.description = "";
        this.story = "";
        this.instructions = "";
        this.tags = [];
        this.pictureFile = null;
    }

    setupRecipeFromJSON(json){
        // TODO: set up the instance internally
    }

}
export default Recipe;