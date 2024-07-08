document.getElementById('startButton').addEventListener('click', () => {
  goFullScreen();
  document.getElementById('startButton').style.display = 'none';
  init();
});
