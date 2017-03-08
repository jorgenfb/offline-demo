const container = document.querySelector('.container');

fetch('data.json')
  .then(response => response.json())
  .then(quotes => {

    // listen for clicks and update quote
    container.addEventListener('click', () => {
      container.innerText = quotes[Math.floor(Math.random() * quotes.length)];
    });
  });

// Get a reference to important DOM parts
const inputArea = document.querySelector('.input-area');
const addBtn = document.querySelector('.add-button');
const form = document.querySelector('form');

// Function to toggle visability of input dialog
const toggle = () => inputArea.classList.toggle('input-area--active');

// Show dialog when + button is clicked
addBtn.addEventListener('click', toggle);

// Handle form submission
form.addEventListener('submit', e => {
  const value = e.target[0].value; // Get quote value
  submit(value); // Send value to server
  toggle(); // Hide dialog
  e.preventDefault(); // Prevent normal form submission
});

// Normal post request
function submitOldschool(quote) {
  fetch('https://pwa-demo-485c1.firebaseio.com/newItems.json', {
    method: 'POST',
    body: JSON.stringify(quote)
  });
}

// Submit function that uses background sync when available
function submit(quote) {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(function(reg) {
      return reg.sync.register(quote);
    }).catch(function() {
      // system was unable to register for a sync,
      // this could be an OS-level restriction
      submitOldschool(quote);
    });
  } else {
    // serviceworker/sync not supported
    submitOldschool(quote);
  }
}
