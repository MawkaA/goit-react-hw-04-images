import 'react-toastify/dist/ReactToastify.css';

import { useState,useEffect  } from 'react';
import { ToastContainer } from 'react-toastify';
import fetchPicturesAPI  from '../services/PicturesAPI';

import styles from './App.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';


function App() {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [largeImageURL, setLargeImageURL] = useState('');
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
  

    useEffect(() => {
        if (!query) return;
        const fetchImages = async () => {
          try {
            const request = await fetchPicturesAPI(query, page);
            if (request.length === 0) {
              return setError(`No results were found for ${query}!`);
            }
           setImages(prevImages => [...prevImages, ...request]);
          } catch (error)
          {
            setError('Something went wrong. Try again.');
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchImages();
      }, [page, query]);

  
  const searchImages = newSearch => {
      setQuery(newSearch);
      setImages([]);
      setPage(1);
      setError(null);
      setIsLoading(true);
    };
  
  const onLoadMore = () => {
      setIsLoading(true);
      setPage(prevPage => prevPage + 1);
      scrollPage();
    };
  
    const onOpenModal = e => {
      setLargeImageURL(e.target.dataset.source);
      toggleModal();
    };
  
    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
    const scrollPage = () => {
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.clientHeight - 160,
          behavior: 'smooth',
        });
      }, 800);
    };
  
    return (
            <div className={styles.App}>
                <ToastContainer autoClose={3000} />
                <Searchbar onHandleSubmit={searchImages} />
                {error && <p>{error}</p>}
                {images.length > 0 && (
                <ImageGallery
                images={images}
                onOpenModal={onOpenModal}
                />
                )}

                {isLoading && <Loader />}

                {!isLoading && images.length >= 12 && !error && (
                <Button onLoadMore={onLoadMore} text="Load more" />
                )}

               {showModal && (
               <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL}>
            
               </Modal>
               )}
            </div>
        );
}
    export default App;
