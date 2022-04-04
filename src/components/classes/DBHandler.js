export default class DBHandler{
    static odataRecipe = "/v1/recipe";
    static odataSingleRecipe = "/v1/recipe?$filter=id eq ";
    static odataSingleIdRecipe = "/v1/recipe/";
    static odataPersonImage = "/v1/imagepersonimplementation";
    static odataSinglePersonImage = "/v1/imagepersonimplementation?$filter=id eq ";
    static odataRecipeImage = "/v1/imagerecipeimplementation";
    static jpgDecoder = "data:image/jpg;base64,";
    static pngDecoder = "data:image/png;base64,";

    static currentIp = process.env.REACT_APP_RRR_API;
    static myHttp = "http://";

// RECIPES

    static POST_Recipe(obj){
        let postString = this.myHttp+this.currentIp+this.odataRecipe;

        fetch(postString, 
            {method: "POST", mode: "cors",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(obj),
        })
        .then(response => response.json())
        .then(odataRecipe => {
            console.log("Success: ", odataRecipe);
        })
        .catch((error) => {
            console.error("Error: ", error);
        })
    }

    static PUT_Recipe(id, obj){
        // find recipe
        let fetchString = this.myHttp+this.currentIp+this.odataSingleRecipe+id;

        let myRequest = new Request(fetchString);

        let resultObj = null;

        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            resultObj = result.value;
        },
        (error) => {
            console.log("Couldn't find Recipe with id: "+id);
        })
        

        // update recipe
        let putString = this.myHttp+this.currentIp+this.odataSingleIdRecipe+id;
       
        fetch(putString, 
            {method: "PUT", mode: "cors",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(obj),
        })
        .then(data => {
            console.log("Success: updated " + id);
        })
        .catch((error) => {
            console.error("Error: no update " + id);
        })
    }

    static GET_ALL_Recipe(){
        let fetchString = this.myHttp+this.currentIp+this.odataRecipe;
        let myRequest = new Request(fetchString);
        let results = []

        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            results = result.value;
        },
        (error) => {
            console.log("Could not get results");
        })

        console.log("results:",results);
    }

    static async GET_5_Recipe(){
        let fetchString = this.myHttp+this.currentIp+this.odataRecipe;
        let myRequest = new Request(fetchString);
        
        let results = [];
        await fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            results = result.value;
        },
        (error) => {
            console.log("Could not get results");
        })

        let returningSet = [];
        if (results.length < 5){
            for (let i = 0; i < results.length; i++) {
                returningSet.push(results[i]);
            }
        }else{
            for (let i = 0; i < 5; i++) {
                returningSet.push(results[i]);
            }
        }
        return returningSet;
    }

    static GET_Recipe(id){
        let fetchString = this.myHttp+this.currentIp+this.odataSingleRecipe+id;

        let myRequest = new Request(fetchString);

        fetch(myRequest, {mode:"cors"})
        .then(res => res.json())
        .then(result => {
            return result.value;
        },
        (error) => {
            this.setState({isLoaded:true,error});
        })
    }

    static async DELETE_Recipe(id){

        let deleteString = this.myHttp+this.currentIp+this.odataSingleIdRecipe+id;
            fetch(deleteString, 
                {method: "DELETE", mode: "cors"})
            .then(data => {
                console.log("Success: deleted " + id);
            })
            .catch((error) => {
                console.error("Error: no delete " + id);
            })
    }

// Instructions
    // static POST_Instructions(obj){

    // }

    // static GET_ALL_Instructions(){

    // }

    // static GET_Instruction(id){
       
    // }

    // static DELETE_Instruction(id){

    // }
}