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
    
    function showRandomQuote(){
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        const p = `<p>${quotes[randomNumber].text}</p>`;
        document.body.innerHTML += p;
    }
    
    function createAddQuoteForm(){
        
    }
});