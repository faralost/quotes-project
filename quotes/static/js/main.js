async function onClick(event) {
    event.preventDefault();
    const url = event.target.href;
    const response = await fetch(url);
    const quotes = await response.json()
    await listQuotes(quotes);
}

function listQuotes(quotes) {
    const container = document.querySelector('.main-container');
    const divs = document.querySelectorAll('.alert-dark');
    if (divs.length !== 0) {
        divs.forEach(function (div) {
            div.remove()
        });
    }
    for (let quote of quotes) {
        let div = document.createElement('div');
        div.className = "alert alert-dark";
        div.innerText = quote.text;
        container.append(div);
        let date = document.createElement('p');
        date.innerText = `Date: ${quote.created_at}`;
        let rating = document.createElement('p');
        rating.innerText = `Rating: ${quote.rating}`;
        let detail = document.createElement('a');
        detail.innerText = 'Details of this quote';
        detail.className = 'detail-link'
        detail.href = `http://localhost:8000/api/v1/quotes/${quote.id}/`;
        let buttonMinus = document.createElement('a');
        let buttonPlus = document.createElement('a');
        buttonMinus.className = 'btn btn-danger';
        buttonPlus.className = 'btn btn-success';
        buttonMinus.innerText = '-';
        buttonPlus.innerText = '+';
        div.append(date, rating, detail, buttonPlus, buttonMinus);
    }
    const detailLinks = document.querySelectorAll('.detail-link');
    detailLinks.forEach(function (curLink) {
        curLink.addEventListener('click', onDetailClick);
    });
}

async function onDetailClick(event) {
    event.preventDefault()
    const url = event.target.href
    const response = await fetch(url)
    const quote = await response.json()
    await quoteDetail(quote);
}

function quoteDetail(quote) {
    const container = document.querySelector('.main-container');
    const divs = document.querySelectorAll('.alert-dark');
    divs.forEach(function (div) {
        div.remove()
    });
    let div = document.createElement('div');
    div.className = "alert alert-dark";
    div.innerText = quote.text;
    container.append(div);
    let date = document.createElement('p');
    date.innerText = `Date: ${quote.created_at}`;
    let rating = document.createElement('p');
    rating.innerText = `Rating: ${quote.rating}`;
    div.append(date, rating);
}

function onLoad() {
    const linkQuotes = document.querySelector('#quotes');
    linkQuotes.addEventListener('click', onClick);
}

window.onload = onLoad;
