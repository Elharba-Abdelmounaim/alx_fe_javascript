let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "life" },
  { text: "Do what you can, with what you have, where you are.", category: "inspiration" }
];
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    const display = document.getElementById('quoteDisplay');

    display.textContent = `"${selectedQuote.text}" — ${selectedQuote.category}`;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function addQuate (){
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const text = textInput.Value.trim();
    const category = categoryInput.value.trim();
    
    if
}