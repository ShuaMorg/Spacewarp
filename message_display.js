// Array of messages with 100 quotes about space by various people
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
    "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of star-stuff. - Carl Sagan",
    "To confine our attention to terrestrial matters would be to limit the human spirit. - Stephen Hawking",
    "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever. - Konstantin Tsiolkovsky",
    "I would like to die on Mars. Just not on impact. - Elon Musk",
    "Across the sea of space, the stars are other suns. - Carl Sagan",
    "We are all connected; to each other, biologically; to the earth, chemically; to the rest of the universe, atomically. - Neil deGrasse Tyson",
    "I don't think the human race will survive the next thousand years, unless we spread into space. - Stephen Hawking",
    "We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard. - John F. Kennedy",
    "The important achievement of Apollo was demonstrating that humanity is not forever chained to this planet and our visions go rather further than that and our opportunities are unlimited. - Neil Armstrong",
    "That's one small step for a man, one giant leap for mankind. - Neil Armstrong",
    "Space exploration is a force of nature unto itself that no other force in society can rival. - Neil deGrasse Tyson",
    "There can be no thought of finishing for ‘aiming at the stars.’ Both figuratively and literally, it is a task to occupy the generations. - Robert Goddard",
    "Mars is there, waiting to be reached. - Buzz Aldrin",
    "Space is an inspirational concept that allows you to dream big. - Peter Diamandis",
    "Earth is the cradle of humanity, but one cannot live in a cradle forever. - Konstantin Tsiolkovsky",
    "Curiosity is the essence of our existence. - Gene Cernan",
    "The Earth is a very small stage in a vast cosmic arena. - Carl Sagan",
    "In the long run, the aggressive civilizations destroy themselves, almost always. It's their nature. They can't help it. - Carl Sagan",
    "The sky is not the limit, it is only the beginning. - David Goudling",
    "Houston, Tranquility Base here. The Eagle has landed. - Neil Armstrong",
    "Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development. - Yuri Gagarin",
    "The dinosaurs became extinct because they didn't have a space program. - Larry Niven",
    "Space exploration is a force of nature unto itself that no other force in society can rival. - Neil deGrasse Tyson",
    "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever. - Konstantin Tsiolkovsky",
    "We are all in the gutter, but some of us are looking at the stars. - Oscar Wilde",
    "To confine our attention to terrestrial matters would be to limit the human spirit. - Stephen Hawking",
    "Curiosity is the essence of our existence. - Gene Cernan",
    "The sky is not the limit, it is only the beginning. - David Goudling",
    "Mars is there, waiting to be reached. - Buzz Aldrin",
    "The important achievement of Apollo was demonstrating that humanity is not forever chained to this planet and our visions go rather further than that and our opportunities are unlimited. - Neil Armstrong",
    "Space is an inspirational concept that allows you to dream big. - Peter Diamandis",
    "I don't think the human race will survive the next thousand years, unless we spread into space. - Stephen Hawking",
    "We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard. - John F. Kennedy",
    "We are all connected; to each other, biologically; to the earth, chemically; to the rest of the universe, atomically. - Neil deGrasse Tyson",
    "To confine our attention to terrestrial matters would be to limit the human spirit. - Stephen Hawking",
    "That's one small step for a man, one giant leap for mankind. - Neil Armstrong",
    "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself. - Carl Sagan",
    "To confine our attention to terrestrial matters would be to limit the human spirit. - Stephen Hawking",
    "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever. - Konstantin Tsiolkovsky",
    "I would like to die on Mars. Just not on impact. - Elon Musk",
    "Somewhere, something incredible is waiting to be known. - Carl Sagan",
    "Imagination will often carry us to worlds that never were. But without it we go nowhere. - Carl Sagan",
    "The universe is a pretty big place. If it's just us, seems like an awful waste of space. - Carl Sagan",
    "Extraordinary claims require extraordinary evidence. - Carl Sagan",
    "Science is not only compatible with spirituality; it is a profound source of spirituality. - Carl Sagan",
    "We are like butterflies who flutter for a day and think it is forever. - Carl Sagan",
    "For small creatures such as we, the vastness is bearable only through love. - Carl Sagan",
    "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of star-stuff. - Carl Sagan",
    "The Earth is a very small stage in a vast cosmic arena. - Carl Sagan",
    "We live in a society exquisitely dependent on science and technology, in which hardly anyone knows anything about science and technology. - Carl Sagan",
    "We are all in the gutter, but some of us are looking at the stars. - Oscar Wilde",
    "The dinosaurs became extinct because they didn't have a space program. - Larry Niven",
    "Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development. - Yuri Gagarin",
    "The sky is not the limit, it is only the beginning. - David Goudling",
    "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself. - Carl Sagan",
    "Somewhere, something incredible is waiting to be known. - Carl Sagan",
    "We live in a society exquisitely dependent on science and technology, in which hardly anyone knows anything about science and technology. - Carl Sagan",
    "Imagination will often carry us to worlds that never were. But without it we go nowhere. - Carl Sagan",
    "The universe is a pretty big place. If it's just us, seems like an awful waste of space. - Carl Sagan",
    "Extraordinary claims require extraordinary evidence. - Carl Sagan",
    "Science is not only compatible with spirituality; it is a profound source of spirituality. - Carl Sagan",
    "We are like butterflies who flutter for a day and think it is forever. - Carl Sagan",
    "For small creatures such as we, the vastness is bearable only through love. - Carl Sagan",
    "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of star-stuff. - Carl Sagan",
    "The Earth is a very small stage in a vast cosmic arena. - Carl Sagan",
    "We are all in the gutter, but some of us are looking at the stars. - Oscar Wilde",
    "To confine our attention to terrestrial matters would be to limit the human spirit. - Stephen Hawking",
    "In the long run, the aggressive civilizations destroy themselves, almost always. It's their nature. They can't help it. - Carl Sagan",
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
            const delay = Math.random() * 120 + 10;
            setTimeout(typeCharacter, delay);
        } else {
            // Wait for 5 seconds before removing the message
            setTimeout(() => {
                document.body.removeChild(messageDiv);
                // Wait for 10 seconds before displaying the next message
                setTimeout(() => {
                    displayMessage(index + 1);
                }, 20000); // 10 seconds in milliseconds
            }, 5000); // 5 seconds in milliseconds
        }
    }

    // Start typing the message
    typeCharacter();
}

// Start the display with the first message in the shuffled array
displayMessage(0);
