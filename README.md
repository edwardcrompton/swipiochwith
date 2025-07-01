# SwipioChwith

SwipioChwith is a simple web application for learning words with translations. Users can interact with words, increment or decrement their scores, and upload new word lists via a CSV file.

## Features

- Displays a random word and its translation.
- Buttons to increment or decrement the score of a word.
- Words with higher scores are more likely to appear.
- Upload new word lists using a CSV file.
- Smooth background color transitions for feedback.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SwipioChwith
   ```

2. Open `index.html` in your browser.

## Usage

1. Click on the displayed word to reveal its translation.
2. Use the **Left** button to increment the score of the word.
3. Use the **Right** button to decrement the score of the word.
4. Upload a new word list:
   - Prepare a CSV file with the format: `word,score,translation`.
   - Use the file input and upload button to add the new words.

## File Structure

- `index.html`: Main HTML file.
- `styles.css`: Contains styles for the application.
- `app.js`: Handles word display, scoring, and interactions.
- `upload.js`: Handles CSV file uploads for new word lists.

## Dependencies

- [localForage](https://github.com/localForage/localForage): Used for storing words locally in the browser.

## Example CSV Format

```
hello,helo
world,byd
goodbye,hwyl fawr
```

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). See the [LICENSE](https://www.gnu.org/licenses/gpl-3.0.en.html) file for details.