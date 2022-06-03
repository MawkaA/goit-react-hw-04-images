import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, onClick, children }) => {
  const elements = items.map(i => (
    <ImageGalleryItem
      key={i.id}
      url={i.webformatURL}
      onClick={() => onClick(i.largeImageURL)}
    />

  ));
  console.log(items);
  return (
    <>
      <ul className="ImageGallery">{elements}</ul>;{children}
    </>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};