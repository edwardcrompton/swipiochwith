document.addEventListener('DOMContentLoaded', () => {
    const wordElement = document.getElementById('word');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    leftButton.style.display = 'none';
    rightButton.style.display = 'none';
    const words = [
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
    let randomIndex = Math.floor(Math.random() * words.length);
    wordElement.textContent = words[randomIndex].word;
    console.log(words);

    const updateWord = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * words.length);
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
        updateWord();
    });

    rightButton.addEventListener('click', () => {
        words[randomIndex].score++;
        updateWord();
    });
});