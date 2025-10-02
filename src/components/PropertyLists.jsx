"use client";
import { deleteData, getData } from "@/firebase/firestoreService";
import { Eye, PencilLine, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Toaster } from "./ui/sonner";

export default function PropertyLists() {
    const [data, setData] = useState([]);
    const [id, setId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const collections = "list_collections_main";

    useEffect(() => {
        async function get() {
            const result = await getData(collections);
            setData(result || []);
        }
        get();
    }, [id]);

    const results =
        searchTerm.trim() === ""
            ? data
            : data.filter(
                (item) =>
                    item.PropertyTitle &&
                    item.PropertyTitle.toLowerCase().startsWith(
                        searchTerm.toLowerCase()
                    )
            );

    const deleteDatum = (id) => {
        setId(id);
        deleteData(collections, id).then(() =>
            toast.success("Document deleted successfully.")
        );
    };

    return (
        <div className="p-[15px]">
            <div className="flex w-full justify-between">
                <div className="flex h-[40px] p-[12px] items-center outline-1 outline-gray-200 rounded-full w-[calc(20%)]">
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search here.."
                        className="outline-none border-none opacity-70 w-full"
                    />
                    <Search className="h-4 w-4 opacity-50" />
                </div>
                <a
                    href="/dashboard/new-record"
                    className="flex h-[40px] p-[10px] gap-[5px] items-center justify-evenly bg-black text-white rounded-[7px] w-[calc(18%)] cursor-pointer hover:bg-black/80"
                >
                    <Plus className="h-4 w-4" />
                    <p>Create Property Listing</p>
                </a>
            </div>
            <div className="p-[50px] flex flex-col gap-[15px]">
                <div className="grid grid-cols-7 w-full bg-black/90 p-[20px] rounded-[4px] font-semibold text-white">
                    <p className="flex justify-center">Title</p>
                    <p className="flex justify-center">Property Type</p>
                    <p className="flex justify-center">Categories</p>
                    <p className="flex justify-center">Size</p>
                    <p className="flex justify-center">Address</p>
                    <p className="flex justify-center">Status</p>
                    <p className="flex justify-center">Actions</p>
                </div>
                {results &&
                    results.map((item, index) => (
                        <div key={item.id || index} className="grid grid-cols-7 w-full bg-gray-100 p-[20px] rounded-[4px]">
                            <p>{item.PropertyTitle}</p>
                            <p>{item.PropertyType}</p>
                            <p>{item.GalleryCategories}</p>
                            <p>{item.Size}</p>
                            <p>{item.Address}</p>
                            <p>{item.AvailabilityStatus}</p>
                            <div className="flex flex-row justify-evenly">
                                <PencilLine className="w-4 h-4 cursor-pointer" />
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <Eye className="w-4 h-4 cursor-pointer hover:text-blue-400" />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>Sample View</DrawerTitle>
                                            <DrawerDescription>Preview here and make any changes you want!</DrawerDescription>
                                        </DrawerHeader>
                                        <div className="flex flex-col gap-[50px] overflow-auto p-[50px]">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-[24px] font-semibold">{item.PropertyTitle}</p>
                                                <p className="text-[20px] text-black/50">{item.InternalNotes}</p>
                                            </div>
                                            <img src={item.PropertyImages} alt="reload" className="w-full h-[500px]" />
                                            <div>
                                                <p className="flex items-center justify-center font-semibold text-[22px]">Property Address</p>
                                                <div className="flex flex-wrap w-full justify-evenly mt-[20px]">
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Address: <p className="font-normal">{item.Address}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">ProjectCommunity: <p className="font-normal">{item.ProjectCommunity}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">ZoneSubarea: <p className="font-normal">{item.ZoneSubarea}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">DateListed: <p className="font-normal">{item.DateListed}</p></p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="flex items-center justify-center font-semibold text-[22px]">Property Amenities</p>
                                                <div className="flex flex-wrap w-full justify-evenly mt-[20px]">
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Property Size: <p className="font-normal">{item.Size}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Bedrooms: <p className="font-normal">{item.Bedrooms}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Bathrooms: <p className="font-normal">{item.Bathrooms}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Floors: <p className="font-normal">{item.Floors}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Floor Number: <p className="font-normal">{item.FloorNumber}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Furnishing: <p className="font-normal">{item.Furnishing}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Year Built: <p className="font-normal">{item.YearBuilt}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Orientation: <p className="font-normal">{item.Orientation}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">View: <p className="font-normal">{item.View}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Parking Availability: <p className="font-normal">{item.ParkingAvailability}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Pet Policy: <p className="font-normal">{item.PetPolicy}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Amenities: <p className="font-normal">{item.Amenities}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Nearby Amenities: <p className="font-normal">{item.NearbyAmenities}</p></p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="flex items-center justify-center font-semibold text-[22px]">Charges and Fees</p>
                                                <div className="flex flex-wrap w-full justify-evenly mt-[20px]">
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Price: <p className="font-normal">{item.Price}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Contract Terms: <p className="font-normal">{item.ContractTerms}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Maintenance Fee / Service Charge: <p className="font-normal">{item.MaintenanceFeeServiceCharge}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Deposit / Payment Terms: <p className="font-normal">{item.DepositPaymentTerms}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Description: <p className="font-normal">{item.Description}</p></p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="flex items-center justify-center font-semibold text-[22px]">Consultant Details</p>
                                                <div className="flex flex-wrap w-full justify-evenly mt-[20px]">
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Consultant Name: <p className="font-normal">{item.PropertyConsultantName}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Consultant Phone: <p className="font-normal">{item.PropertyConsultantPhone}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Email: <p className="font-normal">{item.AgentEmail}</p></p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="flex items-center justify-center font-semibold text-[22px]">Other Details</p>
                                                <div className="flex flex-wrap w-full justify-evenly mt-[20px]">
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Land Use Type: <p className="font-normal">{item.LandUseType}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Incentives / Promotions: <p className="font-normal">{item.IncentivesPromotions}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Multi-language Support: <p className="font-normal">{item.MultilanguageSupport}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Developer Name: <p className="font-normal">{item.DeveloperName}</p></p>
                                                    <p className="font-semibold h-[60px] w-[150px] flex flex-col items-center justify-center">Project Completion Date: <p className="font-normal">{item.ProjectCompletionDate}</p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                                <Trash2
                                    className="w-4 h-4 cursor-pointer hover:text-red-600"
                                    onClick={() => deleteDatum(item.id)}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <Toaster />
        </div>
    );
}
