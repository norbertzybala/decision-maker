const buttons = document.querySelectorAll('button');
const buttonsGroup = document.querySelector('.buttons-group');
const answerElement = document.querySelector('.answer');
const imageElement = document.querySelector('.wrapper');

buttons.forEach(element => {
    element.addEventListener('click', event => {

        makeTransparent(buttonsGroup);

        let link = 'https://yesno.wtf/api/';

        const param = event.target.dataset.param;

        if (param != 'random') {
            link = `${link}?force=${param}`;
        }

        fetch(link)
            .then(response => response.json())
            .then(data => {

                try {
                    const {
                        answer,
                        image
                    } = data;

                    displayAnswer(answer);
                    displayImage(image);
                } catch (error) {
                    console.log('Błąd podczas pobierania danych! ' + error);
                }

            })
            .catch(error => console.log('Błąd podczas nawiązywania połączenia! ' + error));
    })
})

function makeTransparent(element) {
    element.classList.add('transparent');
}

function displayAnswer(answer) {
    answerElement.textContent = answer;
    answerElement.classList.add('show-answer');

    window.setTimeout(() => {
        answerElement.classList.remove('show-answer')
    }, 900);
}

function displayImage(imageSrc) {
    imageElement.style.backgroundImage = `url(${imageSrc})`;
}