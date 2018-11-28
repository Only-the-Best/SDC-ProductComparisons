import React from "react";
import StarRating from "react-star-ratings";

const CompareAtGlance = ({ item, linkText }) => {
  console.log('item', item)
  const getLink = item => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const port = window.location.port;
    if (port !== "") {
      return `${protocol}//${hostname}:${port}/product/${item}`;
    }
    return `${protocol}//${hostname}/product/${item}`;
  };
  return !item ? (
    <div>please wait</div>
  ) : (
    <div className="cag__item">
      <a href={getLink(item.id)}>
        <img className="imgReducedSize" src={item.image} alt="Product" />
      </a>
      <div className="cag__item__main-info text-center">
        <p className="roboto-C cag__item__main-info__name">{item.title}</p>
        <div>
          <StarRating
            numberOfStars={5}
            rating={Number(item.ranking)}
            starRatedColor="#BD5A0E"
            starDimension="15px"
            starSpacing="3px"
          />
          <span className="review">({item.reviews})</span>
        </div>
        <p className="roboto" data-price="dt-price">
          ${item.price}
        </p>
        <a className="cag__link" href={getLink(item.id)}>
          {linkText}
        </a>
      </div>

      <div className="cag__info-group">
        <p className="cag__info-group__title">Sleeping Capacity</p>
        <p className="cag__info-group__info">{item.sleeping_capacity}</p>
      </div>
      <div className="cag__info-group">
        <p className="cag__info-group__title">Packaged Weight</p>
        <p className="cag__info-group__info">{item.packaged_weight}</p>
      </div>
      <div className="cag__info-group">
        <p className="cag__info-group__title">Number of Doors</p>
        <p className="cag__info-group__info">
          {item.numberofdoors > 1
            ? `${item.numberofdoors} doors`
            : `${item.numberofdoors} door`}
        </p>
      </div>
      <div className="cag__info-group">
        <p className="cag__info-group__title">Best Use</p>
        <p className="cag__info-group__info">{item.bestuse}</p>
      </div>
    </div>
  );
};

export default CompareAtGlance;
