import { Heart } from "lucide-react";

const FavouriteProperties = ({ savedProperties, handleWishlist }) => {

    console.log(savedProperties[0])

    if (savedProperties?.length == 0) {
        return <h2 className="text-lg italic">Your wishlist is empty 😢 — go explore cabins you'll love.</h2>
    }

    return (
        <div className="flex flex-col gap-4">

            {savedProperties.map(property => <div key={property.id} className="flex relative gap-2 bg-white rounded-md shadow-md overflow-hidden">
                <div className="w-24 aspect-square overflow-hidden rounded-md bg-gray-100">
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-2">
                    <h2 className="text-md font-heading text-[#3B2F2F] leading-tight">
                        {property.title}
                    </h2>
                    {/* Meta Info */}
                    <div className="text-sm text-gray-600 mt-2 grid gap-1">
                        <span>{property.location}</span>
                        <span className="text-[#4A5A40] font-semibold">
                            ${property.price}/night
                        </span>
                        <span>👥 {property.capacity.people} guests</span>
                        <span>🛏️ {property.capacity.bedroom} bedrooms</span>
                    </div>
                    <button className="absolute top-0 right-0 cursor-pointer hover:bg-black/10 p-2 rounded-full transition" onClick={() => handleWishlist(property)}><Heart fill="#3a4932" /></button>
                </div>
            </div>)}
        </div>

    )
}

export default FavouriteProperties;