document.getElementById('startButton').addEventListener('click', () => {
  goFullScreen();
  document.getElementById('startButton').style.display = 'none';
  init();
  displayMessages(); // Start displaying messages
});

function goFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

function displayMessages() {
  fetch('messages.txt')
    .then(response => response.text())
    .then(text => {
      const messages = text.split('\n').filter(message => message.trim() !== '');
      let messageIndex = 0;
      let charIndex = 0;
      const messageArea = document.createElement('div');
      messageArea.id = 'messageArea';
      messageArea.style.position = 'fixed';
      messageArea.style.bottom = '10px';
      messageArea.style.width = '100%';
      messageArea.style.textAlign = 'center';
      messageArea.style.color = '#39ff14';
      messageArea.style.fontFamily = "'Courier New', Courier, monospace";
      messageArea.style.fontSize = '18px';
      document.body.appendChild(messageArea);

      function typeMessage() {
        if (messageIndex < messages.length) {
          if (charIndex < messages[messageIndex].length) {
            messageArea.innerHTML += messages[messageIndex][charIndex];
            charIndex++;
            setTimeout(typeMessage, Math.random() * 100 + 50); // Random delay between 50 and 150 ms
          } else {
            messageArea.innerHTML += '<br>'; // Move to the next line
            charIndex = 0;
            messageIndex++;
            setTimeout(typeMessage, 1000); // Wait 1 second before starting the next message
          }
        }
      }
      typeMessage();
    })
    .catch(error => console.error('Error fetching messages:', error));
}