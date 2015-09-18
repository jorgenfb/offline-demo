const container = document.querySelector('.container');

fetch('data.json')
  .then(response => response.json())
  .then(quotes => {

    // listen for clicks and update quote
    container.addEventListener('click', () => {
      container.innerText = quotes[Math.floor(Math.random() * quotes.length)];
    });
  });
