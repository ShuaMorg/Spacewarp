// Array of messages with ten quotes about space by various people
const messages = [
    "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself. - Carl Sagan",
    "Somewhere, something incredible is waiting to be known. - Carl Sagan",
    "We live in a society exquisitely dependent on science and technology, in which hardly anyone knows anything about science and technology. - Carl Sagan",
    "Imagination will often carry us to worlds that never were. But without it we go nowhere. - Carl Sagan",
    "The universe is a pretty big place. If it's just us, seems like an awful waste of space. - Carl Sagan",
    "Extraordinary claims require extraordinary evidence. - Carl Sagan",
    "Science is not only compatible with spirituality; it is a profound source of spirituality. - Carl Sagan",
    "We are like butterflies who flutter for a day and think it is forever. - Carl Sagan",
    "For small creatures such as we, the vastness is bearable only through love. - Carl Sagan",
    "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of star-stuff. - Carl Sagan"
];

// Function to shuffle the messages array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the messages array
shuffle(messages);

// Function to display a message
function displayMessage(index) {
    if (index >= messages.length) {
        return; // Exit if all messages have been displayed
    }

    const message = messages[index];

    // Create a div element to hold the message
    const messageDiv = document.createElement('div');

    // Style the div to be at the bottom of the screen with retro gaming font
    messageDiv.style.position = 'fixed';
    messageDiv.style.bottom = '10%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.fontSize = '12px'; // Smaller font size
    messageDiv.style.fontFamily = '"Press Start 2P", cursive';
    messageDiv.style.color = '#39FF14'; // Neon green color
    messageDiv.style.textAlign = 'center';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.pointerEvents = 'none'; // Make the div non-interactive
    messageDiv.style.width = '90%'; // Full width with sensible margin
    messageDiv.style.margin = '0 auto'; // Center align the text

    // Append the div to the body of the document
    document.body.appendChild(messageDiv);

    // Function to type out the message one character at a time with variable speed
    let charIndex = 0;
    function typeCharacter() {
        if (charIndex < message.length) {
            messageDiv.textContent += message[charIndex];
            charIndex++;
            // Random delay between 50ms and 150ms
            const delay = Math.random() * 100 + 50;
            setTimeout(typeCharacter, delay);
        } else {
            // Wait for 5 seconds before removing the message
            setTimeout(() => {
                document.body.removeChild(messageDiv);
                // Wait for 10 seconds before displaying the next message
                setTimeout(() => {
                    displayMessage(index + 1);
                }, 60000); // 10 seconds in milliseconds
            }, 5000); // 5 seconds in milliseconds
        }
    }

    // Start typing the message
    typeCharacter();
}

// Start the display with the first message in the shuffled array
displayMessage(0);