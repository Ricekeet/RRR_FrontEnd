class Recipe {
    
    odataPersonImage = "/v1/imagepersonimplementation";
    odataSinglePersonImage = "/v1/imagepersonimplementation?$filter=id eq ";
    odataRecipeImage = "/v1/imagerecipeimplementation";
    jpgDecoder = "data:image/jpg;base64,";
    pngDecoder = "data:image/png;base64,";

    currentIp = process.env.REACT_APP_RRR_API;
    myHttp = "http://";

    constructor(){
        this.authorId=null;
        this.cuisineId=null;
        this.name=null;
        this.creationDate=null;
        this.servingCount=null;
        this.story=null;
        this.difficulty=null;
        this.imageFile=null;

        this.odataRecipe = "/v1/recipe";
        this.odataSingleRecipe = "/v1/recipe?$filter=id eq ";
        this.odataSingleIdRecipe = "/v1/recipe/";
    }

    createObject(obj){
        this.authorId=obj.authorId;
        this.cuisineId=obj.cuisineId;
        this.name=obj.name;
        this.creationDate=obj.creationDate;
        this.servingCount=obj.servingCount;
        this.story=obj.story;
        this.difficulty=obj.difficulty;
        this.imageFile=obj.imageFile;
    }

    API_AddToDatabase(){
        
    }

}
export default Recipe;