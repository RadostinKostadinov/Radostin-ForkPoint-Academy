const body = document.querySelector('body');

// ●	Create an array of books.
const arrayOfBooks = [
    {
        status: 'read',
        title: 'Scratch: Програмиране за деца /Лесни уроци за малки програмисти/',
        author: 'Незивестен',
        img: 'https://i2.helikon.bg/products/6227/20/206227/206227_b.jpg',
        url: 'https://g.helikon.bg/206227-Scratch:-%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%B8%D1%80%D0%B0%D0%BD%D0%B5-%D0%B7%D0%B0-%D0%B4%D0%B5%D1%86%D0%B0-/%D0%9B%D0%B5%D1%81%D0%BD%D0%B8-%D1%83%D1%80%D0%BE%D1%86%D0%B8-%D0%B7%D0%B0-%D0%BC%D0%B0%D0%BB%D0%BA%D0%B8-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%B8%D1%81%D1%82%D0%B8/.html'
    },
    {
        status: 'unread',
        title: 'HTML 5 & CSS 3. Практическо програмиране за начинаещи',
        author: 'Денис Колисниченко',
        img: 'https://i4.helikon.bg/products/7447/20/207447/207447_b.jpg',
        url: 'https://g.helikon.bg/207447-HTML-5-&-CSS-3.-%D0%9F%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%B8%D1%80%D0%B0%D0%BD%D0%B5-%D0%B7%D0%B0-%D0%BD%D0%B0%D1%87%D0%B8%D0%BD%D0%B0%D0%B5%D1%89%D0%B8.html'
    },
    {
        status: 'read',
        title: 'Cisco. Компютърни мрежи (Основи)',
        author: 'Трой Макмилън',
        img: 'https://i1.helikon.bg/products/9693/19/199693/199693_b.jpg',
        url: 'https://g.helikon.bg/199693-Cisco.-%D0%9A%D0%BE%D0%BC%D0%BF%D1%8E%D1%82%D1%8A%D1%80%D0%BD%D0%B8-%D0%BC%D1%80%D0%B5%D0%B6%D0%B8-(%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%B8).html'
    },
    {
        status: 'read',
        title: 'Linux - практически наръчник по системно и мрежово администриране',
        author: 'Денис Колисниченко',
        img: 'https://i1.helikon.bg/products/8603/20/208603/208603_b.jpg',
        url: 'https://g.helikon.bg/208603-Linux---%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8-%D0%BD%D0%B0%D1%80%D1%8A%D1%87%D0%BD%D0%B8%D0%BA-%D0%BF%D0%BE-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%BD%D0%BE-%D0%B8-%D0%BC%D1%80%D0%B5%D0%B6%D0%BE%D0%B2%D0%BE-%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B8%D1%80%D0%B0%D0%BD%D0%B5.html'
    }
];

// ●	Iterate through the array of books. For each book, create a p element with the book title and author and append it to the page.
const list = document.createElement('ul');
list.style.listStyleType = 'none';
body.appendChild(list);

arrayOfBooks.forEach(book => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const pTitle = document.createElement('p');
    const pAuthor = document.createElement('p');
    const pStatus = document.createElement('p');
    const link = document.createElement('a');
    div.setAttribute('class', 'book');

    img.src = book.img;
    img.setAttribute('class', 'bookCover-img');

    pTitle.textContent = book.title;
    pTitle.setAttribute('class', 'bookTitle');

    pAuthor.textContent = book.author;
    pAuthor.setAttribute('class', 'bookAuthor');

    link.textContent = 'Към магазина';
    link.href = book.url;
    link.setAttribute('class', 'bookLink');

    pStatus.textContent = book.status;
    pStatus.setAttribute('class', 'bookStatus');

    div.appendChild(img);
    div.appendChild(pTitle);
    div.appendChild(pAuthor);
    div.appendChild(link);
    div.appendChild(pStatus);
    li.appendChild(div);
    list.appendChild(li);
});

