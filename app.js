document.addEventListener('DOMContentLoaded', async () => {
    const wordElement = document.getElementById('word');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
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
            // Use the score associated with each word to weight the probability of selection.
            // The higher the score, the more likely the word will be selected.
            const totalScore = words.reduce((total, word) => total + word.score, 0);
            const randomScore = Math.random() * totalScore;
            let scoreSum = 0;
            for (let i = 0; i < words.length; i++) {
                scoreSum += words[i].score;
                if (scoreSum >= randomScore) {
                    newIndex = i;
                    break;
                }
            }
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
            leftButton.style.display = 'inline-block'; // Ensure buttons are displayed
            rightButton.style.display = 'inline-block'; // Ensure buttons are displayed
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
        // Increment the score
        words[randomIndex].score++;
        // Update the words array in localForage
        localforage.setItem('words', words);
        setTimeout(() => {
            updateWord();
        }, fadeDuration * 2);
    });

    rightButton.addEventListener('click', () => {
        fadeBackground('green');
        const fadeDuration = 500;
        // Decrement the score by 1 but do not let it go below 1.
        if (words[randomIndex].score > 1) {
            words[randomIndex].score--;
        }
        // Update the words array in localForage
        localforage.setItem('words', words);
        setTimeout(() => {
            updateWord();
        }, fadeDuration * 2);
    });

    // Add swipe detection
    let touchStartX = 0;
    let touchEndX = 0;

    const handleGesture = () => {
        if (touchEndX < touchStartX - 50) {
            // Swipe right
            rightButton.click();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe left
            leftButton.click();
        }
    };

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });
});