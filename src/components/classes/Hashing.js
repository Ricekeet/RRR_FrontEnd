class Hashing {
    constructor(){
        this.ASCII_LIST = [
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
            't','u','v','w','x','y','z','.',',','!','^','-','=','?','_','(',')','[',']',
            '$','&'];
    }
    static returnASCII_LIST(){
        return this.ASCII_LIST;
    }
    static generateHash(hashKey){
        var hashKey = hashKey.split(" ").join("");
        var hashSum = 0;

        // Iterates through each character and adds into a sum
        Array.from(hashKey).forEach(function(char) {
            if (Array.from(this.ASCII_LIST).findIndex(char) != null){
                hashSum = hashSum + Array.from(this.ASCII_LIST).findIndex(char);
                console.log(hashSum);
            }
        });

        var result = (hashSum*20) % 77;
        return result;
    }
}

export default Hashing;