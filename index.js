document.addEventListener('DOMContentLoaded', async () => {
    const wordElement = document.getElementById('word');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    leftButton.style.display = 'none';
    rightButton.style.display = 'none';
    const defaultWords = [
        { word: 'hello', score: 10, translation: 'helo' },
        { word: 'world', score: 10, translation: 'byd' },
        { word: 'goodbye', score: 10, translation: 'hwyl fawr' },
        { word: 'moon', score: 10, translation: 'lleuad' },
        { word: 'sun', score: 10, translation: 'haul' },
        { word: 'star', score: 10, translation: 'seren' },
        { word: 'sky', score: 10, translation: 'awyr' },
        { word: 'earth', score: 10, translation: 'daear' },
        { word: 'water', score: 10, translation: 'dŵr' },
        { word: 'fire', score: 10, translation: 'tân' }
    ];

    // Initialize localForage
    localforage.config({
        name: 'wordApp',
        storeName: 'words'
    });

    // Retrieve words from localForage or use default words
    let words = await localforage.getItem('words');
    if (!words) {
        words = defaultWords;
        await localforage.setItem('words', words);
    }

    let randomIndex = Math.floor(Math.random() * words.length);
    wordElement.textContent = words[randomIndex].word;
    console.log(words);

    const updateWord = () => {
        let newIndex;
        do {
            // Use the score associated with each word to weight to probability of selection.
            // The higher the score, the less likely the word will be selected.
            const totalInverseScore = words.reduce((total, word) => total + (1 / word.score), 0);
            const randomScore = Math.random() * totalInverseScore;
            let scoreSum = 0;
            for (let i = 0; i < words.length; i++) {
                scoreSum += (1 / words[i].score);
                if (scoreSum >= randomScore) {
                    newIndex = i;
                    break;
                }
            }
            // If the new index is the same as the current index, try again.
            //newIndex = Math.floor(Math.random() * words.length);
        } while (newIndex === randomIndex);
        randomIndex = newIndex;
        wordElement.textContent = words[randomIndex].word;
        leftButton.style.display = 'none';
        rightButton.style.display = 'none';
        console.log(words);
    };

    wordElement.addEventListener('click', () => {
        if (wordElement.textContent === words[randomIndex].word) {
            wordElement.textContent = words[randomIndex].translation;
            leftButton.style.display = 'inline';
            rightButton.style.display = 'inline';
        } else {
            updateWord();
        }
    });

    leftButton.addEventListener('click', () => {
        words[randomIndex].score--;
        // When the score is changed, update the words array in localForage.
        localforage.setItem('words', words);
        updateWord();
    });

    rightButton.addEventListener('click', () => {
        words[randomIndex].score++;
        localforage.setItem('words', words);
        updateWord();
    });
});