class BookList {
    constructor() {
    const thisBooklist = this; 
    thisBooklist.getElements();
    thisBooklist.render();
    thisBooklist.initActions(); 
    }

getElements() {
    const thisBooklist = this;
    thisBooklist.bookList = document.querySelector('.books-list');
    thisBooklist.books = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    
    thisBooklist.favoriteBooks = [];
    thisBooklist.filters = [];
}

render() {
    const thisBooklist = this;
  for (let book of dataSource.books ) {
    
    const ratingBgc = thisBooklist.determineRatingBgc(book.rating);
    const ratingWidth = thisBooklist.determineWidth(book.rating);
    book['ratingBgc'] = ratingBgc;
    book['ratingWidth'] = ratingWidth; 
    const generatedHTML = thisBooklist.books(book);
    const singleBook = utils.createDOMFromHTML(generatedHTML);
    thisBooklist.bookList.appendChild(singleBook);
  }
};

initActions() {
    const thisBooklist = this;
    const allBooks = document.querySelector('.books-list');
    const inputFilters = document.querySelector('.filters');
    console.log(allBooks);
        allBooks.addEventListener('dblclick', function(e) {
            e.preventDefault(); 
            const bookElement = e.target.closest('.book__image');
            if (!bookElement) return;
            const bookAtr = e.target.offsetParent.getAttribute('data-id');
            if(thisBooklist.favoriteBooks.indexOf(bookAtr)) {
                bookElement.classList.add('favorite');
                thisBooklist.favoriteBooks.push(bookAtr);
            } else {
                const index = thisBooklist.favoriteBooks.indexOf(bookAtr);
                thisBooklist.favoriteBooks.splice(index, 1);
                bookElement.classList.remove('favorite');
             
            }  
        })

        inputFilters.addEventListener('click', function(e) {
            console.log(e.target.tagName);
            if(e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && e.target.name == 'filter') {
                console.log('e.target.checked', e.target.checked);
                if(e.target.checked) {
                    thisBooklist.filters.push(e.target.value);
                } else {
                    const index = thisBooklist.filters.indexOf(e.target.value);
                    thisBooklist.filters.splice(index, 1);
                }
            }
            thisBooklist.filterBooks();
        });
    };

filterBooks() {
    const thisBooklist = this;
        let shouldBeHidden = false;
        for(let book of dataSource.books) {
            for(let filter of thisBooklist.filters) {
                if(!book.details[filter]) {
                    shouldBeHidden = true;
                    break; 
                } else {
                    shouldBeHidden = false;
                }
             }
                if(shouldBeHidden) {
                    document.querySelector('.book__image[data-id="'+book.id+'"').classList.add('hidden');  
                } else {
                    document.querySelector('.book__image[data-id="'+book.id+'"').classList.remove('hidden');
                    
                }
            };
        }
    
determineRatingBgc(rating){
    const thisBooklist = this;
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

determineWidth(rating) {
    return Math.floor(rating*10) + '%';
    }

}

const app = new BookList(); 
