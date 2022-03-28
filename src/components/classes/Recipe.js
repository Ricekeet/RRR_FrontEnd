class Recipe {

    constructor(id){
        this.id = id;
        this.title;
        this.description;
        this.story;
        this.instructions;
        this.pictureFile;
    }

    setupRecipeFromJSON(json){
        // TODO: set up the instance internally
    }

    getID(){
        return this.id;
    }
    getTitle(){
        return this.title;
    }
    setTitle(newTitle){
        this.title = newTitle;
    }
    getDescription(){
        return this.description;
    }
    setDescription(newDescription){
        this.description = newDescription;
    }
    getStory(){
        return this.story;
    }
    setStory(newStory){
        this.story = newStory;
    }
    getInstructions(){
        return this.instrucitons;
    }
    setInstructions(newInstructions){
        this.instrucitons = newInstructions;
    }
    getPictureFile(){
        return this.pictureFile;
    }
    setPictureFile(newFile){
        this.pictureFile = newFile;
    }

}


export default Recipe;