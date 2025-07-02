import { Heart } from "lucide-react";

const PropertyCard = ({ property, isFavorite, handleWishlist }) => {

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col sm:flex-row">
      {/* Image */}
      <img
        src={property.image}
        // src="https://csyxkpbavpcrhwqhcpyy.supabase.co/storage/v1/object/public/assets/property-challenge/thumbnail-1.jpg"
        alt={property.title}
        className="w-full sm:w-78 h-64 sm:h-60 object-cover"
      />

      
      <div className="flex gap-2 absolute m-2">
        {property.superhost && (
          <span className="bg-teal-500 text-white rounded-full px-2 py-1 text-xs font-medium inline-block">
            Superhost
          </span>
        )}
        <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs font-medium inline-block">
          {property.type || property.cabinType}
        </span>
      </div>

      {/* Content */}
      <div className=" relative p-6 flex flex-col flex-1">
      <button className="absolute top-2 right-2 cursor-pointer hover:bg-black/10 p-2 rounded-full transition" onClick={() => handleWishlist(property)}><Heart fill={isFavorite ? "#3a4932" : "transparent"} /></button>

        {/* Header: Title + Rating */}
        <h2 className="text-2xl font-heading text-[#3B2F2F] leading-tight">
          {property.title}
        </h2>
        {/* <div className="flex justify-between items-start">
          <p className="text-sm text-gray-500 whitespace-nowrap mt-1 sm:mt-0">
            ⭐ <span className="font-semibold">{property.rating}</span>
          </p>
        </div> */}

        {/* Meta Info */}
        <div className="text-sm text-gray-600 mt-2 flex flex-wrap gap-4">
          <span>{property.location}</span>
          <span className="text-[#4A5A40] font-semibold">
            ${property.price}/night
          </span>
          <span>👥 {property.capacity.people} guests</span>
          <span>🛏️ {property.capacity.bedroom} bedrooms</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-[#4B3E3E] text-sm leading-relaxed line-clamp-3">
          {property.description}
        </p>

        {/* Amenities */}
        <div className="mt-4 text-sm text-[#4B3E3E]">
          <ul className="flex flex-wrap gap-3 text-xs font-medium">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <li key={index} className="bg-[#F3ECE6] px-3 py-1 rounded-full">
                {amenity}
              </li>
            ))}
            {property.amenities.length > 3 && (
              <li className="text-gray-400 text-xs self-center">
                +{property.amenities.length - 3} more
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
