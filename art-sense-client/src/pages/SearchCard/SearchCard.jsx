import { Link } from "react-router-dom";

const SearchCard = ({ photo }) => {
  if (!photo) {
    return null;
  }

  const { _id, artist, title, media, size,lotId , photoUrl, formattedPrice, year, type, isSold } = photo;

  // Determine the correct link based on the type
  let detailPage = "/";
  let buttonText = "View Details"; // Default text

  if (isSold) {
    buttonText = "Sold";
  } else {
    if (type === "photo") {
      detailPage = `/photo/${_id}`;
      buttonText = "Available";
    } else if (type === "auction") {
      detailPage = `/auction/${_id}`;
      buttonText = "Bid";
    } else if (type === "exhibition") {
      detailPage = `/exhibition/${_id}`;
      buttonText = "View Details";
    }
  }

  return (
    <div className="card flex flex-col justify-between h-[450px] rounded-lg overflow-hidden text-sm">
      {/* Image Container */}
      <figure className="px-10 h-[250px] flex items-center justify-center">
        <img
          src={photoUrl}
          alt="Artwork"
          className="w-full h-full object-contain rounded-sm "
        />
      </figure>
      <div className="card text-center p-5 text-sm">
        <div className="text-center">
          <p className="font-bold">{artist}</p>
          <p>
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p>
            {size} <span className="text-red-500">|</span> {year}
            {formattedPrice && <span className="text-red-500"> | {formattedPrice.split(".")[0]}</span>}
          </p>
          <p className="mt-2">
            <span className="text-green-600">{lotId}</span>
          </p>

        </div>
        <div className="mt-2">
          <Link
            className="inline-block w-3/4 py-2 px-4 rounded-md bg-gray-100"
            to={detailPage}>
            <button
              className={`${isSold ? "text-red-500 cursor-not-allowed" : ""}`}
              disabled={isSold}
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
