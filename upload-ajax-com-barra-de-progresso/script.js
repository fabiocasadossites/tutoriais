var formFiles, divReturn, progressBar;

formFiles = document.getElementById('formFiles');
divReturn = document.getElementById('return');
progressBar = document.getElementById('progressBar');

formFiles.addEventListener('submit', sendForm, false);

function sendForm(evt) {


    var formData, ajax, pct;

    formData = new FormData(evt.target);

    ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {

        if (ajax.readyState == 4) {
            formFiles.reset();
            divReturn.textContent = ajax.response;
            progressBar.style.display = 'none';
        } else {
            progressBar.style.display = 'block';
            divReturn.style.display = 'block';
            divReturn.textContent = 'Enviando arquivo!';
        }
    }

    ajax.upload.addEventListener('progress', function (evt) {

        pct = Math.floor((evt.loaded * 100) / evt.total);
        progressBar.style.width = pct + '%';
        progressBar.getElementsByTagName('span')[0].textContent = pct + '%';

    }, false);

    ajax.open('POST', 'upload.php');
    ajax.send(formData);

}