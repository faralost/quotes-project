async function onClick(event) {
    event.preventDefault();
    const url = event.target.href;
    const response = await fetch(url);
    const quotes = await response.json()
    await listQuotes(quotes);
}

function listQuotes(quotes) {
    const container = document.querySelector('.main-container');
    const formContainer = document.querySelector('.form-container')
    formContainer.style.display = 'none'
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
    const linkCreateQuote = document.querySelector('#create-quote');
    linkCreateQuote.addEventListener('click', onCreateClick);
}

async function onCreateClick(event) {
    event.preventDefault();
    const divs = document.querySelectorAll('.alert-dark');
    divs.forEach(function (div) {
        div.remove()
    });
    const formContainer = document.querySelector('.form-container');
    if (document.querySelector('.alert-success')){
        document.querySelector('.alert-success').remove()
    }
    formContainer.style.display = 'block'
    let url = event.target.href
    document.querySelector('form').onsubmit = async function (event) {
        event.preventDefault()
        const text = document.querySelector('#text').value;
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const data = {
            "text": text,
            "name": name,
            "email": email
        }
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, settings);
        if (response.status === 400) {
            if (text === null || text === '') {
                let textError = document.querySelector('#text');
                textError.className = 'form-control is-invalid'
            } else if (text) {
                let textError = document.querySelector('#text');
                textError.className = 'form-control is-valid'
            }
            if (name === null || name === '') {
                let nameError = document.querySelector('#name');
                nameError.className = 'form-control is-invalid'
            } else if (name) {
                let nameError = document.querySelector('#name');
                nameError.className = 'form-control is-valid'
            }
            if (email === null || email === '') {
                let emailError = document.querySelector('#email');
                emailError.className = 'form-control is-invalid'
            } else if (email) {
                let emailError = document.querySelector('#email');
                emailError.className = 'form-control is-valid'
            }
        } else if (response.status === 201) {
            document.querySelector('#text').value = '';
            document.querySelector('#name').value = '';
            document.querySelector('#email').value = '';
            formContainer.style.display = 'none'
            const container = document.querySelector('.main-container');
            let messageDiv = document.createElement('div');
            messageDiv.className = 'alert alert-success'
            messageDiv.innerText = 'Quote has been successfully added! You will be able' +
                ' to see it in main page after Moderator checks it!'
            container.append(messageDiv)
        }
    };
}

window.onload = onLoad;
