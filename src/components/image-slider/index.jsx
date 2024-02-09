import { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './styles.css';

// the main props used will be the url for the main url itself, the limit set, and page set. We will be getting these from our parent component, as well as within our logic.
export default function ImageSlide({ url, limit = 5, page = 1 }) {
  // this is our state for holding our images within an empty array
  const [images, setImages] = useState([]);
  // this is our state for our image slider logic when we click left, right, or on the indicators.
  const [currentSlide, setCurrentSlide] = useState(0);
  //  this is our state for loading in
  const [loading, setLoading] = useState(false);
  //  this is our state for error handling
  const [errorMsg, setErrorMsg] = useState(null);

  //  our async function for getting the url
  async function fetchImages(getUrl) {
    // we use a try catch method for best practices
    try {
      // our loading is true if we are still running through our function and statement
      setLoading(true);

      // fetch the url and store it into the response variable, and assign that to the data variable.
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      // the url with the parameters of getUrl, page, and limit. This link we are fetching is the link that follows after the main url link in our parent component.
      const data = await response.json();

      if (data) {
        // if data is true, our setImage function will have the data variable of the url
        setImages(data);
        // if our data is true, then we've already loaded our images in.
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      //   if there is an error, we can't load anything, so it's false
      setLoading(false);
    }
  }

  // if the url if empty or something goes wrong, we will use the useEffect hook with the url dependency. If the url is not empty, then run the fetchImages function with an argument of url. The order that I console logged my images, and placed my useEffect hook seem to actually matter. Might be the case since it's not an async function itself.
  useEffect(() => {
    if (url !== '') {
      fetchImages(url);
    }
  }, [url]);

  console.log(images);

  if (loading) {
    // if the loading state is true, then we need to let the user know it's loading.
    return <div>Loading data! Please wait</div>;
  }

  if (errorMsg !== null) {
    // if our errorMsg state is not null, then an arror has occured, and we need to tell the user along with the errorMsg itself.
    return <div>Error occured! {errorMsg}</div>;
  }

  function handlePrevious() {
    // our image slider logic goes as this: when we are at the end of the slide and click right, we will reset to the beginning, and vice versa.
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    // So if you are the first image which is indicated as 0, and you click back, you will go to the last image. Otherwise, you will just move one image down.
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    // if we are at the last image in the images array, then return back to the first image if we click right. Otherwise, we move right 1.
  }

  return (
    <div className="container">
      {/* our left arrow button */}
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {
        // here we render our images. as long as images array and the images length is true, then render out the images array with each imageItem as a img tag. We pass in the appropriate props into each attribute.
        images && images.length
          ? images.map((imageItem, index) => (
              <img
                src={imageItem.download_url}
                alt={imageItem.download_url}
                key={imageItem.id}
                className={
                  // if our current slide is the same as our current index, then add the current image class that simply shows us the current image. Otherwise, you will hide the current-image by not displaying it.
                  currentSlide === index
                    ? 'current-image'
                    : 'current-image hide-current-image'
                }
              />
            ))
          : null
      }
      {/* our right arrow button */}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      {/* here is where we will render out our circle indicators below the images */}
      <span className="circle-indicators">
        {/* as long as the images and images length is true, render the images as an empty element with an index argument. Each item in the images array will be rendered as the button tag with the specific index. The buttons are the current indicators */}
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  // if our currentSlide state is the same as the current index of our current indicator, then apply the current-indicator class. Otherwise, it will gray out with the other indicators except for the current index.
                  currentSlide === index
                    ? 'current-indicator'
                    : 'current-indicator inactive-indicator'
                }
                // when we click on any indicator button, it will show us the current slide index that we clicked.
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
