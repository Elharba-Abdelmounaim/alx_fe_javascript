// Initial list of quotes
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "life" },
  { text: "Do what you can, with what you have, where you are.", category: "inspiration" }
];

// Load saved quotes from localStorage
loadQuotes();

// Fill the category dropdown menu
populateCategories();

// Display a quote based on the selected category
filterQuotes();

// Show a random quote from the list
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  const display = document.getElementById('quoteDisplay');
  display.innerHTML = `"${selectedQuote.text}" — ${selectedQuote.category}`;
}

// When the user clicks "Show New Quote", run the function above
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Add a new quote from user input
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();                  // Save to local storage
    populateCategories();         // Update dropdown if new category
    showRandomQuote();            // Show the new quote
    sendQuoteToServer(newQuote);  // Simulate sending to server

    alert('Quote added!');
    textInput.value = '';
    categoryInput.value = '';
  } else {
    alert("Please fill in both fields.");
  }
}

// Save all quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage if available
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  }
}

// Import quotes from a local JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Build the category dropdown menu
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });

  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    categoryFilter.value = savedCategory;
  }
}

// Show a quote based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);

  let filtered;

  if (selectedCategory === "all") {
    filtered = quotes;
  } else {
    filtered = quotes.filter(q => q.category === selectedCategory);
  }

  if (filtered.length > 0) {
    const q = filtered[0];
    document.getElementById('quoteDisplay').innerHTML = `"${q.text}" — ${q.category}`;
  } else {
    document.getElementById('quoteDisplay').textContent = "No quotes found for this category.";
  }
}

// Simulate getting quotes from a remote server
async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();

  // Convert post titles to quotes
  const serverQuotes = data.slice(0, 5).map(post => ({
    text: post.title,
    category: "server"
  }));

  return serverQuotes;
}

// Sync local data with "server" data (simulated)
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  const localData = JSON.stringify(quotes);
  const remoteData = JSON.stringify(serverQuotes);

  if (localData !== remoteData) {
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert("📡 Local data synced with server. Server data was used.");
    document.getElementById("syncNotice").textContent = "✅ Data updated from server.";
  }
}

// Run sync every 60 seconds
setInterval(syncWithServer, 60000);

// Simulate sending a quote to the server
async function sendQuoteToServer(quote) {
  await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: quote.text,
      body: quote.category,
      userId: 1
    })
  });
}
