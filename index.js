document.addEventListener('DOMContentLoaded', () => {
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    
    leftButton.addEventListener('click', () => {
        const event = new Event('swipeleft');
        wordElement.dispatchEvent(event);
    });

    rightButton.addEventListener('click', () => {
        const event = new Event('swiperight');
        wordElement.dispatchEvent(event);
    });
    const wordElement = document.getElementById('word');
    const words = [
        { word: 'hello', score: 10 },
        { word: 'world', score: 10 },
        { word: 'goodbye', score: 10 },
        { word: 'moon', score: 10 }
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
        console.log(words);
    };

    wordElement.addEventListener('click', updateWord);

    wordElement.addEventListener('swipeleft', () => {
        words[randomIndex].score--;
        updateWord();
    });

    wordElement.addEventListener('swiperight', () => {
        words[randomIndex].score++;
        updateWord();
    });
}); 