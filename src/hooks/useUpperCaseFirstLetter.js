/**
 * Function to checks word and pass first letter to uppercase
 * @param {string} word 
 * @returns {string} 
 */
export function useUpperCaseFistLetter(word){
    // Check the word or multiple words
    if (word && typeof word === 'string' && word.trim().length > 0) {
        // Use space to separate word
        const words = word.trim().split(/\s+/);

        const capitalizedWords = words.map((w, index) => {
            // Capitalize the first word only
            if (index === 0 && /^[A-Za-z]+$/.test(w)) {
                return w.charAt(0).toUpperCase() + w.slice(1);
            } else {
                return w;
            }
        });

        // Return all words
        return capitalizedWords.join(' ');
    } 
}