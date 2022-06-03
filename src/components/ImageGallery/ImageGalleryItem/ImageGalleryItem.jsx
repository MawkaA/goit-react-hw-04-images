
import PropTypes from 'prop-types';

function ImageGalleryItem({ url, onClick}) {
    return (
      <li >
        <img
          src={url}
          alt=""
          onClick={onClick}
        />
      </li>
    );
  }
  

ImageGalleryItem.propTypes = {
        url: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;