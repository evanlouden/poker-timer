## Poker Timer

### Steps for usage

1. Open `dist/index.html` using a web browser
2. Create a tournament `structure.csv` file. The format is columns Small Blind, Big Blind, Ante (either BB or individual), and level time (in minutes). For breaks enter the word "break" in the small blind cell position and the length of the break in the length position. There is a default structure.csv with a common tournament structure that you can modify to your preference.
3. Using the input in the upper left, load the `structure.csv` file. For safety, web browsers won't automatically load files so this step is required.
4. The Start/Stop button in the lower left operates the clock. Pressing the `spacebar` will also start and stop the timer.
5. You can start at any level in the structure by using the select menu on the lower right.
6. If something goes sideways you can always reload the page and start over.

### Development

1. Clone this repo
2. `yarn install`
3. `yarn run serve:css`
4. In a separate terminal window `live-server`
