document.addEventListener('DOMContentLoaded', async () => {
    const wordElement = document.getElementById('word');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    leftButton.style.display = 'none';
    rightButton.style.display = 'none';
    const defaultWords = [
        { word: 'hello', score: 20, translation: 'helo' },
        { word: 'world', score: 10, translation: 'byd' },
        { word: 'goodbye', score: 2, translation: 'hwyl fawr' },
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
            const totalInverseScore = words.reduce((total, word) => total + (word.score > 0 ? 1 / word.score : 0), 0);
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

    const fadeBackground = (color) => {
        document.body.classList.add(`fade-${color}`);
        setTimeout(() => {
            document.body.classList.remove(`fade-${color}`);
        }, 1000); // 500ms for fade in and 500ms for fade out
    };

    leftButton.addEventListener('click', () => {
        fadeBackground('red');
        const fadeDuration = 500;
        // Decrement the score by 1 but do not let it go below 0.
        if (words[randomIndex].score > 0) {
            words[randomIndex].score--;
        }
        // When the score is changed, update the words array in localForage.
        localforage.setItem('words', words);
        setTimeout(() => {
            updateWord();
        }, fadeDuration * 2);
    });

    rightButton.addEventListener('click', () => {
        // Add a special effect so that background of the screen gradually changes to green and back over the course of half a second.
        // Call fadeBackground('green') to change the background to green and fadeBackground('red') to change it back to red.
        
        fadeBackground('green');
        const fadeDuration = 500;

        words[randomIndex].score++;
        localforage.setItem('words', words);
        setTimeout(() => {
            updateWord();
        }, fadeDuration * 2);
    });
});