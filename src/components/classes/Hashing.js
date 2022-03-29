class Hashing {
    static ASCII_LIST = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
    'r','s','t','u','v','w','x','y','z','.',',','!','^','-','=','?','_','(',')','[',']','$','&'];

    static returnASCII_LIST(){
        return this.ASCII_LIST;
    }
    static generateHash(hashKey){
        var hashKey = hashKey.split(" ").join("");
        var hashSum = 0;
        var list = [];
        list = this.ASCII_LIST;

        // Iterates through each character and adds into a sum
        Array.from(hashKey).forEach(function(char) {
            if (Array.from(list).indexOf(char) != null){
                hashSum = hashSum + Array.from(list).indexOf(char);
            }
        })

        var result = hashSum;
        while (result < 1000 || result > 9999){
            if (result > 9999){
                result = result % 369;
            }
            result = result * 21;
            console.log(result);
        }
        return result;
    }
}

export default Hashing;