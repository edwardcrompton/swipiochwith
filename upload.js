document.addEventListener('DOMContentLoaded', () => {
    const csvFileInput = document.getElementById('csvFileInput');
    const uploadButton = document.getElementById('uploadButton');

    uploadButton.addEventListener('click', async () => {
        // Initialize localForage
        localforage.config({
            name: 'wordApp',
            storeName: 'words'
        });

        
        const file = csvFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const text = event.target.result;
                const lines = text.split('\n');
                const newWords = lines
                    .filter(line => line.trim() !== '')
                    .map(line => {
                        const [word, translation] = line.split(',').map(value => value.trim());
                        return { word, translation, score: 10 };
                    });

                // Update the words in localForage
                await localforage.setItem('words', newWords);
                alert('Words updated successfully!');
            };
            reader.readAsText(file);
        } else {
            alert('Please select a CSV file.');
        }
    });
});
