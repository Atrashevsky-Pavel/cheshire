import './styles/style.scss'


const certificates = document.querySelectorAll('.certificate');
const modal = document.getElementById('modal-show');
const closeModal = document.getElementById('close-modal');
const html = document.querySelector('html');
const modalImage = document.getElementById('modal-image');

let url;

Array.prototype.forEach.call(certificates, el =>
    el.addEventListener('click', (el) => {
        url = el.target.attributes.src.value;
        modal.style.display = 'flex';
        html.style.overflow = 'hidden'
        modalImage.setAttribute('src', url);
    }));

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    html.style.overflow = 'auto'
});










