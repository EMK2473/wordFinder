// using two different fetch request formats for learning purposes
function displayQuoteResult(quoteText, author) {
  let quoteResult = document.getElementById("quoteResult");
  quoteResult.innerHTML = `<strong>Quote:</strong> ${quoteText}<br><strong>Author:</strong> ${author}`;
}
let submitCategoryButton = document.getElementById("submitCategory");

// event listener for category selection
submitCategoryButton.addEventListener("click", function () {
  let categorySelect = document.getElementById("categorySelect");
  let selectedCategory = categorySelect.value;

  // using variables for url and api key fetchh method
  let apiUrl =
    "https://api.api-ninjas.com/v1/quotes?category=" + selectedCategory;
  let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((result) => {
      let quoteText = result[0].quote;
      let author = result[0].author;
      displayQuoteResult(quoteText, author);
      console.log(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// DOMContentLoaded fires once the HTML doc has been COMPLETELY parsed; does not wait for asnycs.
// "load" is only used to detect a fully loaded-page; DOMContentLoaded is appropriate here.
document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("wordForm");
  let resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let inputText = document.getElementById("inputText").value;

    if (inputText.trim() !== "") {
      fetchDefinition(inputText);
    } else {
      resultDiv.textContent = "Please enter a word.";
    }
  });

  // using function fetch url without variables method
  function fetchDefinition(word) {
    console.log("Input word:", word);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      method: "GET",
      credentials: "same-origin",
      redirect: "follow",
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(function (data) {
        displayDefinition(data);
      })
      .catch(function (error) {
        console.error("Error fetching definition:", error);
        resultDiv.textContent = "Check your spelling.";
      });
  }

  function displayDefinition(data) {
    resultDiv.innerHTML = "";
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((definitionData, index) => {
        let partOfSpeech = definitionData.meanings[0].partOfSpeech;
        let definition = definitionData.meanings[0].definitions[0].definition;
        let definitionElement = document.createElement("div");
        definitionElement.innerHTML = `<strong>${partOfSpeech}:</strong> ${definition}`;
        resultDiv.appendChild(definitionElement);
        console.log("Data Object:", definitionData);
      });
    } else {
      resultDiv.textContent = "Definition not found.";
    }
  }
});

// new functions here
function displayAuthor(authorData) {
  let authorResult = document.getElementById("authorResult");
  authorResult.innerHTML = `
    <strong>Name:</strong> ${authorData.name}<br>
    <strong>Title:</strong> ${authorData.title}<br>
  `;
}

let submitAuthorButton = document.getElementById("authorForm");

// event listener for author name submission
submitAuthorButton.addEventListener("submit", function (event) {
  event.preventDefault();
  let authorText = document.getElementById("authorText").value;

  // Construct the API URL for fetching author data
  let apiUrl = `https://api.api-ninjas.com/v1/historicalfigures?name=${authorText}`;
  let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((result) => {
      if (result.length > 0) {
        let authorData = result[0]; // Assuming the API returns an array of results
        displayAuthor(authorData);
        console.log(result);
      } else {
        authorResult.textContent = "Author not found.";
        console.log("Author not found");
        // You can display an error message if the author is not found
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
