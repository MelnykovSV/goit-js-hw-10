fetch('https://restcountries.com/v3.1/name/uk')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
