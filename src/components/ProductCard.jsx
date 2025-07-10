import { MapPin, ThumbsUp, User } from "lucide-react";

const ProductCard = () => {
    return (
        <div className="rounded-md shadow-md overflow-hidden space-y-4">
            <img className="w-full h-64 object-fit" src="https://hipcamp-res.cloudinary.com/images/f_auto,c_limit,w_550,q_auto/v1657036711/campground-photos/d1zckythvfxv4mughfgx/bear-den-cabins-camp-lil-bear-cabin.jpg" alt="" />
            <div className="p-2 space-y-2">
                <p className="text-sm flex items-center gap-1"><ThumbsUp size={18} /> <span className="font-semibold">100%</span><span>(14)</span></p>
                <h3 className="text-xl font-heading text-[#3B2F2F] font-semibold leading-tight">Bear Den Cabins & Camp</h3>
                <p className=" text-sm flex items-center gap-4"><span className="flex items-center gap-1"><MapPin size={18} />Finland</span><span className="flex items-center gap-1"><User size={18} />4 guests</span></p>
                <p className="text-md text-[#3B2F2F] leading-tight font-semibold">Just $206/night</p>
            </div>
        </div>
    )
}

export default ProductCard;