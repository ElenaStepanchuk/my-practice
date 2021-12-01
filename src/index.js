import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Для gallery-simpleLightbox.html

const lightbox = new SimpleLightbox('.more-photos-simplightbox a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    nav: true,
    close: true,
});

const lightbox1 = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    nav: true,
    close: true,
});