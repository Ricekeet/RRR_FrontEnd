class Hashing {
    static ASCII_LIST = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
    't','u','v','w','x','y','z','.',',','!','^','-','=','?','_','(',')','[',']',
    '$','&'];

    static returnASCII_LIST(){
        return this.ASCII_LIST;
    }
    static generateHash(hashKey){
        console.log("generateHash 1");
        var hashKey = hashKey.split(" ").join("");
        console.log("HashKey:",hashKey);
        var hashSum = 0;

        // Iterates through each character and adds into a sum
        Array.from(hashKey).forEach(function(char) {
            if (Array.from(this.ASCII_LIST).findIndex(char) != null){
                hashSum = hashSum + Array.from(this.ASCII_LIST).findIndex(char);
                console.log("HashSum:",hashSum);            }
        });

        var result = (hashSum*20) % 77;
        console.log("Result:", result);
        return result;
    }
}

export default Hashing;