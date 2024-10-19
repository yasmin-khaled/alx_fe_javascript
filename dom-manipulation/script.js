document.addEventListener("DOMContentLoaded", ()=>{
    let quotes = [
        {
          text: "A B C.",
          category: "Motivation"
        },
        {
          text: "AA BB CC.",
          category: "Inspiration"
        },
        {
          text: "AAA BBB CCC.",
          category: "Life"
        },
        {
          text: "AAAA BBBB CCCC.",
          category: "Success"
        },
        {
          text: "AAAAA BBBBB CCCCC.",
          category: "Motivation"
        }
      ];
    
    const p = document.createElement('p');
    document.body.appendChild(p);

    function showRandomQuote(){
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        const randQuoteP = document.getElementsByTagName('p')[0];
        randQuoteP.innerHTML = `<p>${quotes[randomNumber].text}</p>`;
    }
    
    function createAddQuoteForm(){
        
    }

    function addQuote(){
        const newQuoteText = document.getElementById('newQuoteText');
        let newQuote = {
            text: '',
            category:''
        }
        if(newQuoteText){
            newQuote.text = newQuoteText.text;
        }

        const newQuoteCategory = document.getElementById('newQuoteCategory');
        if(newQuoteCategory){
            newQuote.category = newQuoteCategory.text;
        }
        quotes.push(newQuote);
    }

    const newQuoteButton = document.getElementById('newQuote');
    newQuoteButton.addEventListener('click', () => {showRandomQuote();});
});