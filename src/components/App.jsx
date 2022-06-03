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
    // const [largeImageURL, setLargeImageURL] = useState('');
    const [page, setPage] = useState(1);
    const [state, setState] = useState({
      images: [],
      isLoading: false,
      error: null,
    });

    const [showModal, setShowModal] = useState({
      isModalOpen: false,
      modalData: '',
    });
  
    useEffect(() => {
      if (!query) {return};
      const fetchImages = async () => {
        const images = await fetchPicturesAPI(query, page);
  
        setState(prevState => ({
          images: [...prevState.images, ...images],
          isLoading: false,
        }));
      };
      try {
        setState(prevState => ({ ...prevState, isLoading: true }));
        fetchImages();
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          error: error.message,
        }));
      }
    }, [query, page]);
    //   const fetchImages = async () => {
    //     try {
    //       const images = await fetchPicturesAPI(query, page);
    //       if (images.length === 0) {
    //         return setState(prevState => ({
    //           ...prevState,
    //           isLoading: false,           
    //           error:`No results were found for ${query}!`,
    //           }));}
    //       setState(prevState => ({
    //         ...prevState,
    //                  images: [...prevState.images, ...images],
    //                  isLoading: false,
    //                }));
    //     }catch (error) {
    //       setState(prevState => ({
    //         ...prevState,
    //         error:  'No results were found',
    //         isLoading: false,
    //       }));
    //     } finally {
    //       setState(prevState => ({
    //         isLoading: false,
    //       }));
    //     }
    //   };
  
    //   fetchImages();
    // }, [page, query]);
  
  // const searchImages = newSearch => {
  //     setQuery(newSearch);
  //     setState({images,isLoading:true,error});
  //     setPage(1);
      
  //   };
  
  const onLoadMore = () => {
    setPage(prevState=>prevState+1);
      scrollPage();
    };
  
    const searchImages = q => {
      if (!q) {
        alert('error, try again');
        return;
      }
      setQuery(q);
      setPage(1);
    };
    const toggleModal = modalData => {
      setShowModal({
        isModalOpen: true,
        modalData,
      });
    };
    const closeModal = () => {
      setShowModal(prevState => ({
        ...prevState,
        isModalOpen: false,
      }));
    };
    const { isLoading, images } = state;
  
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
        <Searchbar onSubmit={searchImages} />
    
      {Boolean(images.length) && (
        <ImageGallery items={images} onClick={toggleModal}>
          <Button text="Load More" onLoadMore={onLoadMore} />
        </ImageGallery>
      )}
      {isLoading && <Loader isEnabled={isLoading} />}
      {showModal.isModalOpen && (
        <Modal close={closeModal}>
          <img src={showModal.modalData} alt="Nothing to see here" />
        </Modal>
      )}
    </div>
  );
}
    export default App;
