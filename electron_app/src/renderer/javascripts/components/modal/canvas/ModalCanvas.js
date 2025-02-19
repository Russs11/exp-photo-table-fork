import React, { useState, useEffect, useContext, useRef } from 'react';
import { modalDataContext } from '../../../App';
import Arrow from './tools/Arrow';
import Hand from './tools/Hand';
import Hand2 from './tools/Hand2';
import HandFree from './tools/HandFree';
import { renderImgInCanvas, renderScaleGridInCanvas } from '../../../services/forModalCanvas/renderFunctions'
import { cutImgInGallery } from '../../../services/forModalCanvas/cuttingFunctions'
import GallaryImage from '../../../entities/GalleryImage';
import ModalCanvasTools from './ModalCanvasTools';
const ModalCanvas = () => {
  const localModalProperties = useContext(modalDataContext);

  const galleryImg = localModalProperties.galleryImg;
  const setGalleryImg = localModalProperties.setGalleryImg;
  const galleryImages = localModalProperties.galleryImages;
  const indexImgInGallery = localModalProperties.modalProperties.indexImgInGallery;

  const [toolState, setToolState] = useState({ type: 'handFree', tool: null });
  const [isZoomScaleGrid, setIsZoomScaleGrid] = useState(false);
  const [canvasImg, setCanvasImg] = useState(new Image())

  const canvasRef = useRef();
  const scaleGridCanvasRef = useRef();
  let canvasSize = { width: 0, height: 0 };

  function handClickHandler() {
    if (toolState.type === 'hand') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      setToolState((prev) => {
        return {
          ...prev,
          type: 'hand',
          tool: new Hand2(
            canvasRef.current,
            canvasImg,
            canvasSize,
            galleryImg,
            setGalleryImg,
            scaleGridCanvasRef.current)
        }
      })
    };
  }
  function arrowClickHandler() {
    if (toolState.type === 'arrow') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!galleryImg.getImgCuted()) {
        setIsZoomScaleGrid(false)
        setTimeout(() => {
          canvasRef.current.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const newGallaryImage = Object.assign(new GallaryImage(), {
              ...galleryImg,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            })
            setGalleryImg(() => {
              return newGallaryImage;
            })
            setToolState((prev) => {
              return {
                ...prev,
                type: 'handFree',
                tool: new HandFree(canvasRef.current)
              }
            });
          }, 'image/jpeg', 1)
        }, 0)
      } else {
        setToolState((prev) => {
          return {
            ...prev,
            type: 'arrow',
            tool: new Arrow(
              canvasRef.current,
              galleryImg,
              setGalleryImg)
          }
        });
      }
    };
  }
  function arrowtextDescClickHandler() {
    if (toolState.type === 'arrowTextDesc') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!galleryImg.getImgCuted()) {
        setIsZoomScaleGrid(false)
        setTimeout(() => {
          canvasRef.current.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const newGallaryImage = Object.assign(new GallaryImage(), {
              ...galleryImg,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            })
            setGalleryImg(() => {
              return newGallaryImage;
            })
            setToolState((prev) => {
              return {
                ...prev,
                type: 'handFree',
                tool: new HandFree(canvasRef.current)
              }
            });
          }, 'image/jpeg', 1)
        }, 0)
      }
      setToolState((prev) => {
        return {
          ...prev,
          type: 'arrowTextDesc',
          tool: new HandFree(canvasRef.current)
        }
      });
    };
  }
  function imgDescClickHandler() {
    if (toolState.type === 'imgDesc') {
      setToolState((prev) => { return { ...prev, type: 'handFree', tool: new HandFree(canvasRef.current) } });
    } else {
      if (!galleryImg.getImgCuted()) {
        setIsZoomScaleGrid(false)
        setTimeout(() => {
          canvasRef.current.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const newGallaryImage = Object.assign(new GallaryImage(), {
              ...galleryImg,
              url: url,
              imgCuted: true,
              lastOffsetValueX: 0,
              lastOffsetValueY: 0,
              zoom: '100'
            })
            setGalleryImg(() => {
              return newGallaryImage;
            })
            setToolState((prev) => {
              return {
                ...prev,
                type: 'handFree',
                tool: new HandFree(canvasRef.current)
              }
            });
          }, 'image/jpeg', 1)
        }, 0)
      }
      setToolState((prev) => {
        return {
          ...prev,
          type: 'imgDesc',
          tool: new HandFree(canvasRef.current)
        }
      });
    };
  }
  function orientationPanoramaClickHandler() {
    const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: 'panorama', lastOffsetValueX: 0 })
    canvasSize = getCanvasSize(newGallaryImage.getOrientation(), canvasImg)
    setGalleryImg(() => { return newGallaryImage })
    setToolState(() => {
      return {
        type: 'hand',
        tool: new Hand2(
          canvasRef.current,
          canvasImg,
          canvasSize,
          newGallaryImage,
          setGalleryImg,
          scaleGridCanvasRef.current)
      }
    })
  }
  function orientationHorizontalClickHandler() {
    const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: 'horizontal', lastOffsetValueX: 0 })
    canvasSize = getCanvasSize(newGallaryImage.getOrientation(), canvasImg)
    setGalleryImg(() => { return newGallaryImage })
    setToolState(() => {
      return {
        type: 'hand',
        tool: new Hand2(
          canvasRef.current,
          canvasImg,
          canvasSize,
          newGallaryImage,
          setGalleryImg,
          scaleGridCanvasRef.current)
      }
    })
  }
  function orientationVerticalClickHandler() {
    const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: 'vertical', lastOffsetValueX: 0 })
    canvasSize = getCanvasSize(newGallaryImage.getOrientation(), canvasImg)
    setGalleryImg(() => { return newGallaryImage })
    setToolState(() => {
      return {
        type: 'hand',
        tool: new Hand2(
          canvasRef.current,
          canvasImg,
          canvasSize,
          newGallaryImage,
          setGalleryImg,
          scaleGridCanvasRef.current)
      }
    })
  }
  function orientation9X6ClickHandler() {
    const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: '9X6', lastOffsetValueX: 0 })
    canvasSize = getCanvasSize(newGallaryImage.getOrientation(), canvasImg)
    setGalleryImg(() => { return newGallaryImage })
    setToolState(() => {
      return {
        type: 'hand',
        tool: new Hand2(
          canvasRef.current,
          canvasImg,
          canvasSize,
          newGallaryImage,
          setGalleryImg,
          scaleGridCanvasRef.current)
      }
    })
  }
  function orientation6X9ClickHandler() {
    const newGallaryImage = Object.assign(new GallaryImage(), { ...galleryImg, orientation: '6X9', lastOffsetValueX: 0 })
    canvasSize = getCanvasSize(newGallaryImage.getOrientation(), canvasImg)
    setGalleryImg(() => { return newGallaryImage })
    setToolState(() => {
      return {
        type: 'hand',
        tool: new Hand2(
          canvasRef.current,
          canvasImg,
          canvasSize,
          newGallaryImage,
          setGalleryImg,
          scaleGridCanvasRef.current)
      }
    })
  }
  function arrowColorChangeHandler(event) {
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsColor: event.target.value });
    })
    setToolState((prev) => {
      return {
        ...prev,
        type: 'arrow',
        tool: new Arrow(
          canvasRef.current,
          galleryImg,
          setGalleryImg)
      }
    });
  }
  function arrowWidthChangeHandler(event) {
    const newState = Object.assign(new GallaryImage(), { ...galleryImg, arrowsWidth: event.target.value });

    setGalleryImg((prev) => {
      return newState;
    })
    setToolState((prev) => {
      return {
        ...prev,
        type: 'arrow',
        tool: new Arrow(
          canvasRef.current,
          newState,
          setGalleryImg)
      }
    });
  }
  function arrowTextDescChangeHandler(event) {
    const arr = [...galleryImg.getArrowsArray()];

    for (const item of arr) {
      if (item.getNumber() === event.target.id) {
        item.setText(event.target.value);
      };
    }
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsArray: arr });
    })
  }
  function imgDescChangeHandler(event) {
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, imgDesc: event.target.value });
    })
  }
  function arrowTextDescDeleteClickHandler(event) {
    const filrerArray = [...galleryImg.arrowsArray].filter((item) => {
      if (item.getNumber() !== event.target.id)
        return item;
      return false;
    });

    const numberingArray = filrerArray.map((item, i) => {
      item.setNumber(i + 1)
      return item;
    })
    setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsArray: numberingArray });
    })
  }
  function cutClickHandler() {
    setIsZoomScaleGrid(false)
    setTimeout(() => {
      cutImgInGallery(canvasRef, galleryImg, setGalleryImg, setToolState, setCanvasImg)
    }, 0)
  }
  function zoomScaleGridClickHandler(event) {
    if (isZoomScaleGrid) {
      setIsZoomScaleGrid(false)
      // setToolState(() => {
      //   return {
      //     type: 'hand',
      //     tool: new Hand2(
      //       canvasRef.current,
      //       canvasImg,
      //       canvasSize,
      //       galleryImg,
      //       setGalleryImg,
      //       false,
      //       scaleGridCanvasRef)
      //   }
      // });
    } else {
      setIsZoomScaleGrid(true)
      // setToolState(() => {
      //   return {
      //     type: 'hand',
      //     tool: new Hand2(
      //       canvasRef.current,
      //       canvasImg,
      //       canvasSize,
      //       galleryImg,
      //       setGalleryImg,
      //       true,
      //       scaleGridCanvasRef)
      //   }
      // });
    }

    event.target.classList.toggle('modal-content-grid-properties-right-orientation-scale_grid-btn');
    event.target.classList.toggle('modal-content-grid-properties-right-orientation-scale_grid-btn-active');
  }
  function rotationLeftDownHandler(event) {
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateLeft')
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateLeft-active')
  }
  function rotationLeftUpHandler(event) {
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateLeft')
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateLeft-active')
    const newState = Object.assign(new GallaryImage(), { ...galleryImg });
    newState.setRotationDegrees(`${+newState.getRotationDegrees() - 90}`)
    if (+newState.getRotationDegrees() < -180) newState.setRotationDegrees('-180')
    setGalleryImg((prev) => {
      return newState;
    })
  }
  function rotationRightDownHandler(event) {
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateRight')
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateRight-active')
  }
  function rotationRightUpHandler(event) {
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateRight')
    event.target.classList.toggle('modal-content-grid-properties-right-modalCanvasTools-rotateRight-active')
    const newState = Object.assign(new GallaryImage(), { ...galleryImg });
    newState.setRotationDegrees(`${+newState.getRotationDegrees() + 90}`)
    if (+newState.getRotationDegrees() > 180) newState.setRotationDegrees('180')
    setGalleryImg((prev) => {
      return newState;
    })
  }
  function renderProperties(toolType) {
    if (toolType === 'hand') {
      return (
        <>
          {galleryImg.getImgCuted() ? <div className='modal-content-grid-properties-right-block'></div> : null}
          <div className='modal-content-grid-properties-right-title'>Ориентация:</div>
          <div className='modal-content-grid-properties-right-orientation'>
            <div className={galleryImg.getOrientation() === "panorama" ?
              'modal-content-grid-properties-right-orientation-panorama-active' :
              'modal-content-grid-properties-right-orientation-panorama'}
              onClick={orientationPanoramaClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "horizontal" ?
              'modal-content-grid-properties-right-orientation-horizontal-active' :
              'modal-content-grid-properties-right-orientation-horizontal'}
              onClick={orientationHorizontalClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "vertical" ?
              'modal-content-grid-properties-right-orientation-vertical-active' :
              'modal-content-grid-properties-right-orientation-vertical'}
              onClick={orientationVerticalClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "9X6" ?
              'modal-content-grid-properties-right-orientation-9X6-active' :
              'modal-content-grid-properties-right-orientation-9X6'}
              onClick={orientation9X6ClickHandler}
            ></div>
            <div className={galleryImg.getOrientation() === "6X9" ?
              'modal-content-grid-properties-right-orientation-6X9-active' :
              'modal-content-grid-properties-right-orientation-6X9'}
              onClick={orientation6X9ClickHandler}
            ></div>
          </div>
          <div className='modal-content-grid-properties-right-scale_grid'>
            <div className={'modal-content-grid-properties-right-orientation-scale_grid-btn'}
              onClick={event => zoomScaleGridClickHandler(event)}
            ></div>
            <div className="modal-content-grid-properties-right-modalCanvasTools-btn"></div>
            <div className="modal-content-grid-properties-right-modalCanvasTools-rotateLeft"
              onMouseDown={rotationLeftDownHandler}
              onMouseUp={rotationLeftUpHandler}
            ></div>
            <div className="modal-content-grid-properties-right-modalCanvasTools-rotateRight"
              onMouseDown={rotationRightDownHandler}
              onMouseUp={rotationRightUpHandler}
            ></div>
          </div>
          <ModalCanvasTools
            galleryImg={galleryImg}
            setGalleryImg={setGalleryImg}
            toolState={toolState}
          />
          <div className='modal-content-grid-properties-right-cut-btn'
            onClick={cutClickHandler}>{galleryImg.getImgCuted() ? "Готово" : "Применить"}</div>
        </>
      );
    }
    if (toolType === 'arrow') {
      return (
        <>
          <div className='modal-content-grid-properties-right-title'>Цвет стрелок:</div>
          <div className='modal-content-grid-properties-right-arrow-color'>
            <input
              type="color"
              value={galleryImg.getArrowsColor()}
              onChange={arrowColorChangeHandler}
            ></input>
          </div>
          <div className='modal-content-grid-properties-right-title'>Ширина стрелок:</div>
          <div className='modal-content-grid-properties-right-zoom'>
            <div className='modal-content-grid-properties-right-zoom-range'>
              <input
                type="range"
                step="1"
                min="1"
                max="5"
                value={galleryImg.getArrowsWidth()}
                onChange={arrowWidthChangeHandler}
              ></input>
            </div>
            <div className='modal-content-grid-properties-right-zoom-scale'>Значение: {galleryImg.getArrowsWidth()}</div>
          </div>
        </>
      );
    }
    if (toolType === 'arrowTextDesc') {
      if (galleryImg.getArrowsArray().length > 0) {
        const tempRendArray = [];
        for (const item of galleryImg.getArrowsArray()) {
          tempRendArray.push(
            <div className='modal-content-grid-properties-right-list_item' key={item.getNumber()}>
              <div className='modal-content-grid-properties-right-list_item-number'>{item.getNumber()}</div>
              <input
                type="text"
                id={item.getNumber()}
                placeholder='Введите описание...'
                value={item.getText()}
                onChange={arrowTextDescChangeHandler}
              ></input>
              <div
                className='modal-content-grid-properties-right-list_item-delete'
                id={item.getNumber()}
                onClick={arrowTextDescDeleteClickHandler}
              ></div>
            </div>
          );
        }
        return tempRendArray;
      }

      return (<div className='modal-content-grid-properties-right-title'>Данные о стрелках отсутствуют</div>);
    }
    if (toolType === 'imgDesc') {
      return (
        <div className='modal-content-grid-properties-right-text-area'>
          <textarea
            placeholder='Введите описание изображения...'
            value={galleryImg.getImgDesc()}
            onChange={imgDescChangeHandler}
            maxLength={galleryImg.getOrientation() === 'vertical' ? 46 : 150}
          ></textarea>
        </div>
      );
    }
  }
  function getCanvasSize(orientation, img) {
    if (orientation === "horizontal" || orientation === "9X6") {
      let canvasWidth = 0
      let canvasHeight = 0
      let height = ((window.outerHeight - 50) / 100) * 80
      if (((height / 3) * 4) > (((window.outerWidth - 350) / 100) * 80)) {
        canvasWidth = ((window.outerWidth - 350) / 100) * 80
        canvasHeight = (canvasWidth / 4) * 3
      } else {
        canvasWidth = ((height / 3) * 4)
        canvasHeight = height
      }
      return ({ width: canvasWidth, height: canvasHeight })
    }
    if (orientation === "vertical" || orientation === "6X9") {
      let canvasWidth = 0
      let canvasHeight = 0
      let width = ((window.outerWidth - 350) / 100) * 80
      if (((width / 3) * 4) > (((window.outerHeight - 50) / 100) * 80)) {
        canvasHeight = ((window.outerHeight - 50) / 100) * 80
        canvasWidth = (canvasHeight / 4) * 3
      } else {
        canvasHeight = ((height / 3) * 4)
        canvasWidth = width
      }
      return ({ width: canvasWidth, height: canvasHeight })
    }
    if (orientation === "panorama") {
      const canvasWidth = ((window.outerWidth - 350) / 100) * 80
      const canvasHeight = (canvasWidth * img.height) / img.width
      return ({ width: canvasWidth, height: canvasHeight })
    }
  }

  useEffect(() => {
    galleryImages.forEach((item) => {
      if (item.getIndex() === indexImgInGallery) {
        const newGalleryImg = Object.assign(new GallaryImage(), item);
        setGalleryImg(() => newGalleryImg)

        const img = new Image()
        img.onload = function () {
          setCanvasImg(this)

          canvasSize = getCanvasSize(galleryImg.getOrientation(), this)

          setToolState(() => {
            return {
              type: 'hand',
              tool: new Hand2(
                canvasRef.current,
                this,
                canvasSize,
                galleryImg,
                setGalleryImg,
                scaleGridCanvasRef.current)
            }
          });
        }
        img.src = newGalleryImg.getUrl();
      }
    })
  }, [])

  useEffect(() => {
    if (canvasImg.src) {
      canvasSize = getCanvasSize(galleryImg.getOrientation(), canvasImg)
      renderImgInCanvas(canvasRef, canvasImg, canvasSize, galleryImg)
      renderScaleGridInCanvas(scaleGridCanvasRef, canvasSize, galleryImg, isZoomScaleGrid)
    }
  }, [galleryImg, isZoomScaleGrid, canvasImg]);

  return (
    <div className="modal-content-grid-edit">
      <div className='modal-content-grid-tools-left'>
        <div className={
          toolState.type === 'hand'
            ? 'modal-content-grid-tools-left-hand-active'
            : 'modal-content-grid-tools-left-hand'} onClick={handClickHandler}></div>
        <div className={
          toolState.type === 'arrow'
            ? 'modal-content-grid-tools-left-arrow-active'
            : 'modal-content-grid-tools-left-arrow'} onClick={arrowClickHandler}></div>
        <div className={
          toolState.type === 'arrowTextDesc'
            ? 'modal-content-grid-tools-left-textDesc-active'
            : 'modal-content-grid-tools-left-textDesc'} onClick={arrowtextDescClickHandler}></div>
        <div className={
          toolState.type === 'imgDesc'
            ? 'modal-content-grid-tools-left-imgDesc-active'
            : 'modal-content-grid-tools-left-imgDesc'} onClick={imgDescClickHandler}></div>
      </div>
      <canvas
        ref={canvasRef}
        className='modal-content-grid-canvas'
      ></canvas>
      <canvas
        ref={scaleGridCanvasRef}
        className='modal-content-grid-canvas-scaleGrid'
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
      <div className='modal-content-grid-properties-right'>
        <div className='modal-content-grid-properties-right-title'>Свойства</div>
        {renderProperties(toolState.type)}
      </div>
    </div>
  );
}

export default ModalCanvas;