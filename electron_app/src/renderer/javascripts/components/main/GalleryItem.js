import React from 'react';

const GalleryItem = ({ name, url, hiden, setModalProperties, setCurrentGalleryImage, galleryImages }) => {
  let shortName = '';
  if (name.length > 20) {
    shortName = name.substr(0, 20) + '...'; // обрезаем слишком длинное имя файла
  }

  const dbClickHandler = (event) => {
    event.preventDefault();
    setModalProperties(() => {
      return {
        isOpen: true,
        type: "preview",
        nameImg: shortName ? shortName : name,
        urlImg: url
      }
    });
  }

  const dragStartHandler = (event) => {
    setTimeout(() => event.target.classList.add('gallery-item-hide'), 0);
    setCurrentGalleryImage({ nameImg: name, urlImg: url });
  }

  const dragEndHandler = (event) => {
    if (galleryImages.length === 0) {
      event.target.classList.remove('gallery-item-hide');
    }

    let isFindedInGalleryImages = galleryImages.find(item => {
      if (name === item.getName()) return true;
      return false;
    })

    if (!isFindedInGalleryImages) {
      event.target.classList.remove('gallery-item-hide');
    }

    setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null });
  }
  
  if (hiden) {
    return (
      <div className="gallery-item gallery-item-hide"
        draggable="false"
      >
        <div className="gallery-item-name">{shortName ? shortName : name}</div>
        <div className="gallery-item-img">
          <img
            src={url}
            alt={name}
            draggable="false"></img>
        </div>
      </div>
    );
  } else {
    return (
      <div className="gallery-item"
        onDoubleClick={dbClickHandler}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        draggable="true"
      >
        <div className="gallery-item-name">{shortName ? shortName : name}</div>
        <div className="gallery-item-img">
          <img
            src={url}
            alt={name}
            draggable="false"></img>
        </div>
      </div>
    );
  }
}

export default GalleryItem;