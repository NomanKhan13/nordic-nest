const PropertyListingShimmer = () => {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 8 }, (ele) => (
                <div className="bg-white w-full rounded-md shadow-md overflow-hidden flex flex-col sm:flex-row gap-2">
                    <div className="bg-black/15 animate-pulse w-full sm:w-78 h-64 sm:h-60"></div>
                    <div className="flex justify-between">
                        <div className="p-4 flex flex-col gap-4">
                            <div className="bg-black/15 animate-pulse w-80 h-12"></div>
                            <div className="bg-black/15 animate-pulse w-80 h-6"></div>
                            <div className="bg-black/15 animate-pulse w-80 h-6"></div>
                            <div className="bg-black/15 animate-pulse w-80 h-4"></div>
                        </div>
                        <div className="bg-black/15 animate-pulse w-10 h-8 m-4"></div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default PropertyListingShimmer;