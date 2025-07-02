
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "life" },
  { text: "Do what you can, with what you have, where you are.", category: "inspiration" }
];

loadQuotes();
populateCategories();
filterQuotes()

function showRandomQuote()  {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    const display = document.getElementById('quoteDisplay');

    display.innerHTML = `"${selectedQuote.text}" — ${selectedQuote.category}`;
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();
    
  if(text && category){
    const newQuote = {text , category};
    quotes.push(newQuote);
    saveQuotes();
    showRandomQuote();

    alert ('Quote added! ');
    textInput.value = '';
    categoryInput.value = '';
  } else {
    alert("please fill in both fields. ")
  }
}

function saveQuotes(){
  localStorage.setItem('quotes', JSON.stringify(quotes));

}

function loadQuotes(){
  const stored = localStorage.getItem('quotes');
  if(stored){
    quotes = JSON.parse(stored);
  }
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event){
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

function  populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');

  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement('option')
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option)
  });

  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory){
    categoryFilter.value = savedCategory
  }
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value
  localStorage.setItem('selectedCategory', selectedCategory);

  let filterQuotes;

  if (selectedCategory === "all"){
    filterQuotes = quotes;
  } else {
    filterQuotes = quotes.filter(q => q.category === selectedCategory);
  }
  const q = filterQuotes[0];
  quoteDisplay.innerHTML = `"${q.text}" — ${q.category}`;

}