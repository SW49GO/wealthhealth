/**
 * Function to checks word and pass first letter to uppercase
 * @param {string} word 
 * @returns {string} 
 */
export function useUpperCaseFistLetter(word){
    //Checks that the word is entirely alphanumeric
    if(word && /^[A-Za-z]+$/.test(word)){
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
}