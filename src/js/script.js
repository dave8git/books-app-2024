const bookList = document.querySelector('.books-list');
const books = Handlebars.compile(document.querySelector('#template-book').innerHTML);
console.log(document.querySelector('#template-book').innerHTML);
const favoriteBooks = [];
const filters = [];
const render = function() {
  for (let book of dataSource.books ) {
    
    const ratingBgc = determineRatingBgc(book.rating);
    const ratingWidth = determineWidth(book.rating);
    book['ratingBgc'] = ratingBgc;
    console.log('ratingBgc', ratingBgc);
    book['ratingWidth'] = ratingWidth; 
    console.log('ratingWidth', book.ratingWidth);
    console.log('book.rating', book);
    const generatedHTML = books(book);
    const singleBook = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(singleBook);
  }
};

const initActions = function() {
    const allBooks = document.querySelector('.books-list');
    const inputFilters = document.querySelector('.filters');
    console.log(allBooks);
        allBooks.addEventListener('dblclick', function(e) {
            e.preventDefault(); 
            const bookAtr = e.target.offsetParent.getAttribute('data-id');
            if(favoriteBooks.indexOf(bookAtr)) {
                e.target.offsetParent.classList.add('favorite');
                favoriteBooks.push(bookAtr);
                console.log(favoriteBooks);
            } else {
                const index = favoriteBooks.indexOf(bookAtr);
                favoriteBooks.splice(index, 1);
                e.target.offsetParent.classList.remove('favorite');
                console.log(favoriteBooks);
            }  
        })

        inputFilters.addEventListener('click', function(e) {
            console.log(e.target.tagName);
            if(e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && e.target.name == 'filter') {
                console.log('e.target.checked', e.target.checked);
                if(e.target.checked) {
                    filters.push(e.target.value);
                } else {
                    console.log('jest e.target.value w tablicy inputFilters');
                    const index = filters.indexOf(e.target.value);
                    filters.splice(index, 1);
                    console.log(filters);
                }
            }
            filterBooks();
        });
    };

    const filterBooks = function() {
        let shouldBeHidden = false;
        for(let book of dataSource.books) {
            for(let filter of filters) {
                if(!book.details[filter]) {
                    shouldBeHidden = true;
                    break; 
                    console.log('tak równa się true');
                } else {
                    shouldBeHidden = false;
                }
             }
                if(shouldBeHidden) {
                    console.log(book);
                    document.querySelector('.book__image[data-id="'+book.id+'"').classList.add('hidden');
        
                    
                } else {
                    document.querySelector('.book__image[data-id="'+book.id+'"').classList.remove('hidden');
                    
                }
            };
        }
    
        const determineRatingBgc = function(rating){
            let background = '';
            if (rating < 6) {
              background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            } else if (rating > 6 && rating <= 8) {
              background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
            } else if (rating > 8 && rating <= 9) {
              background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else if (rating > 9) {
              background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
            }
            return background;
          }
         
        const determineWidth = function(rating) {
            return Math.floor(rating*10) + '%';
          }

render();
initActions(); 
