const form = document.querySelector('form');
const search = document.querySelector('#search');
const searchButton = document.querySelector('.btn-submit');
const container = document.querySelector('.container');

function searchForGif(e){
  e.preventDefault();
  let searchInput = search.value;

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=VTntkqwEAzzsoVr6XQ6ZBjr8YX5yPK2e&q=${searchInput}&limit=30&offset=0&rating=g&lang=en`, 
  {
    mode: 'cors'
  })
  .then(response => {
    return response.json()
  })
  .then(response => {
    createImg().forEach(img => {
      let randomNumber = Math.floor(Math.random() * 30);
      img.setAttribute('src', response.data[randomNumber].images.original.url);
      container.appendChild(img);
    });
  }).catch(() => {
    console.error('Cant find any images with that keyword');
  });

  container.innerHTML = '';
  form.reset();
}

function createImg() {
  let imgs = [];

  for (let i = 0; i < 30; i++) {
    let img = document.createElement('img');
    imgs.push(img);
  }

  return imgs;
}

searchButton.addEventListener('click', searchForGif);