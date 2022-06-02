
import PropTypes from 'prop-types';

function ImageGalleryItem({ webformatURL, largeImageURL, tags,  onOpenModal }) {
    return (
      <li >
        <img
          src={webformatURL}
          alt={tags}
          data-source={largeImageURL}
          
          onClick={onOpenModal}
        />
      </li>
    );
  }
  

ImageGalleryItem.propTypes = {
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        onOpenModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;