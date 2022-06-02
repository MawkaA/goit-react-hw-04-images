import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onOpenModal}) {
    return (
        <ul className="ImageGallery">
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onOpenModal={onOpenModal}
        />
         ))}
        </ul>
    );
}

ImageGallery.propTypes = {
    images:  PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          webformatURL: PropTypes.string,
          largeImageURL: PropTypes.string,
          tags: PropTypes.string,
        }).isRequired,
      ).isRequired,
    onOpenModal: PropTypes.func.isRequired,
};