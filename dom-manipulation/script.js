document.addEventListener("DOMContentLoaded", ()=>{
    let quotes = [];

      function loadQuotes() {
        quotes = JSON.parse(localStorage.getItem("quotes") || "[]");
        populateCategories();
        const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
        const selectedQuote = quotes.filter(q => q.category === lastSelectedCategory);     
        const randQuoteP = document.getElementsByTagName('p')[0];
        randQuoteP.innerHTML = `<p>${selectedQuote[0]?.text}</p>`;
      }
    
    function populateCategories(){
        const map = new Map();
        quotes.forEach(q => {
            map.set(q.category, q.category);
        });

        const categoriesList = document.getElementById('categoryFilter');
        map.forEach((key, value) => {
            let option = document.createElement('option');
            option.value = key;
            option.textContent = value;
            categoriesList.appendChild(option);
        });
    }
    const p = document.createElement('p');
    document.body.appendChild(p);

    function showRandomQuote(){
        if(quotes.length <= 0) return;
        const randomNumber = Math.floor(Math.random() * quotes.length);
        const randQuoteP = document.getElementsByTagName('p')[0];
        randQuoteP.innerHTML = `<p>${quotes[randomNumber].text}</p>`;
    }
    
    function createAddQuoteForm(){
        
    }

    const addQuoteButton = document.getElementById('add-quote-btn');
    addQuoteButton.addEventListener('click', () => {
        const newQuoteText = document.getElementById('newQuoteText');
        let newQuote = {
            text: '',
            category:''
        };

        if(newQuoteText){
            newQuote.text = newQuoteText.value;
        }

        const newQuoteCategory = document.getElementById('newQuoteCategory');
        if(newQuoteCategory){
            newQuote.category = newQuoteCategory.value;
        }
        quotes.push(newQuote);
        saveQuotes();
    });

    const newQuoteButton = document.getElementById('newQuote');
    newQuoteButton.addEventListener('click', () => {showRandomQuote();});

    const exportButton = document.getElementById('exportFile');
    exportButton.addEventListener('click', () => {
        const jsonQuotes = JSON.stringify(quotes);
        const blob = new Blob([jsonQuotes], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "quotes.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    const importButton = document.getElementById('importFile');
    importButton.addEventListener('change', (event) => {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          const importedQuotes = JSON.parse(event.target.result);
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
      });

      function saveQuotes(){
        localStorage.setItem("quotes", JSON.stringify(quotes));
      }

      const filterQuotes = document.getElementById('categoryFilter');
      filterQuotes.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        localStorage.setItem('lastSelectedCategory', selectedCategory); 
        const selectedQuote = quotes.filter(q => q.category === selectedCategory);
        const display = document.getElementById('quoteDisplay');
        const randQuoteP = document.getElementsByTagName('p')[0];
        randQuoteP.innerHTML = `<p>${selectedQuote[0].text}</p>`;
        for (let index = 1; index < selectedQuote.length; index++) {
            const newP = document.createElement('p');
            newP.innerHTML = `<p>${selectedQuote[index].text}</p>`;
            randQuoteP.insertAdjacentElement('afterend', newP);
        }  
      });
      
    loadQuotes();

    async function fetchQuotesFromServer() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const importedQuotes = await response.json();
            return importedQuotes.map(q => ({ text: q.text, category: q.category }));
        } catch (error) {
            console.error('Could not import the quotes:', error);
            return [];
        }
    }

    setInterval(async () => {
        const importedQuotes = await fetchQuotesFromServer();
    
        const updatedQuotes = importedQuotes.filter(iq => {
            quotes.find(q => q.hasOwnProperty(iq.text)) === 'undefined'
        });

        updatedQuotes.forEach(element => {
            quotes.push(element);
        });
        localStorage.setItem("quotes", JSON.stringify(quotes));
    
        updatedQuotes = importedQuotes.filter(iq => {
            quotes.find(q => q.hasOwnProperty(iq.category)) === 'undefined'
        });
        if(updatedQuotes.length > 0){
            populateCategories();
        }
        console.error('Quotes has been imported from server');
    }, 600000);
});