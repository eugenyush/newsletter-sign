import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', function() {

    const emailInput = document.querySelector('#email');
    const btn = document.querySelector('btn');
    const invalidMsg = document.querySelector('.invalid-feedback');

    const newsCard = document.querySelector('.news-card')
    
    function checkMail(){
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailInput.value) ? true : false;
    } 

    function checkDisplay(a){
        return a ? "none":"block";
    } 

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        postData(item);
    })

    function postData(form){
        form.addEventListener('submit', (e) =>{
            e.preventDefault();

            const formData = new FormData(form);

            const object = {};

            if(checkMail()){
                formData.forEach(function(value, key){
                    object[key] = value;
                    });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(response  => {
                console.log(response);
                showThanksCard();
            }).finally(() => {
                form.reset();
            });

            }
            invalidMsg.style.display = checkDisplay(checkMail());
        })
    }

    function showThanksCard(){
        newsCard.style.display = "none";

        const thanksCard = document.createElement('div');
        thanksCard.classList.add('success-card');
        thanksCard.innerHTML = `
            <img src="/public/imges/icon-success.svg" alt="" srcset="">
            <div class="success-card-title">Thanks for subscribing!</div>
            <div class="success-card-text"> A confirmation email has been sent to <b>${emailInput.value}</b>. 
            Please open it and click the button inside to confirm your subscription.</div>
        `;
        document.querySelector('#app').append(thanksCard);

        setTimeout(() => {
            thanksCard.remove();
            newsCard.style.display = "flex";
        },8000);
    }
});