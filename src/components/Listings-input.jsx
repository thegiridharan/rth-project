"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { addData, getData } from "@/firebase/firestoreService";
import { InputContext, InputProvider } from "@/utils/form-context";
import { AirVent, BadgeIndianRupee, CircleCheckBig } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PageContext, PageProvider } from "@/utils/form-fields-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function DropDownInput({ title, collection_name }) {
    const { values, setValue } = useContext(InputContext);
    const [position, setPosition] = useState("");
    const [data, setData] = useState(null);
    const collections = collection_name;

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        async function get() {
            setData(await getData(collections));
        }
        get();
    }, []);

    return (
        <div className="p-[10px] flex flex-col gap-[10px] w-[250px]">
            <p className="flex gap-[4px] font-semibold">
                {title}<span className="text-red-600">*</span>
            </p>
            <Select
                value={position}
                onValueChange={(val) => {
                    setValue({ [collection_name]: val });
                    setPosition(val);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Select" || capitalize(collection_name)} />
                </SelectTrigger>
                <SelectContent>
                    {data &&
                        data.map((item, idx) => (
                            <SelectItem key={idx} value={item.option}>
                                {item.option}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    )
}

function FormInput({ title, type, placeholder, collection_name }) {
    const { values, setValue } = useContext(InputContext);
    const [data, setData] = useState(null);
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div className="p-[10px] flex flex-col gap-[10px] w-[250px]">
            <p className="flex gap-[4px] font-semibold">{title}<span className="text-red-600">*</span></p>
            <Input type={type} placeholder={placeholder} onChange={(e) => setValue({ [collection_name]: e.target.value })} />
        </div>
    );
}


function Pagination() {
    const [page1, setPage1] = useState(false);
    const [page2, setPage2] = useState(false);
    const [page, setPage] = useState(<Form1 />);

    function Form1() {
        return (
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-[20px]">
                    <FormInput title="Old Ref no" type="text" placeholder="Ref No" collection_name="OldRefno" />
                    <DropDownInput title="Project / Community" collection_name="ProjectCommunity" />
                    <DropDownInput title="Zone / Sub-area" collection_name="ZoneSubarea" />
                    <FormInput title="Property Title" type="text" placeholder="Property Title" collection_name="PropertyTitle" />
                    <DropDownInput title="Transaction Type" collection_name="TransactionType" />
                    <DropDownInput title="Property Type" collection_name="PropertyType" />
                    <FormInput title="Address" type="text" placeholder="Address" collection_name="Address" />
                    <FormInput title="Date Listed" type="date" placeholder="Date" collection_name="DateListed" />
                    <DropDownInput title="Availability Status" collection_name="AvailabilityStatus" />
                    <FormInput title="Size (m²)" type="number" placeholder="Size" collection_name="Size" />
                    <FormInput title="Bedrooms" type="number" placeholder="Bedrooms" collection_name="Bedrooms" />
                    <FormInput title="Bathrooms" type="number" placeholder="Bathrooms" collection_name="Bathrooms" />
                    <FormInput title="Floors" type="number" placeholder="Floors" collection_name="Floors" />
                    <FormInput title="Floor Number" type="number" placeholder="Floor Number" collection_name="FloorNumber" />
                    <DropDownInput title="Furnishing" collection_name="Furnishing" />
                    <FormInput title="Year Built" type="number" placeholder="Year Built" collection_name="YearBuilt" />
                    <DropDownInput title="Orientation" collection_name="Orientation" />
                    <DropDownInput title="View" collection_name="View" />
                    <DropDownInput title="Parking Availability" collection_name="ParkingAvailability" />
                    <DropDownInput title="Pet Policy" collection_name="PetPolicy" />
                    <DropDownInput title="Amenities" collection_name="Amenities" />
                    <FormInput title="Nearby Amenities" type="text" placeholder="Nearby Amenities" collection_name="NearbyAmenities" />
                </div>
                <div className="w-full flex justify-end">
                    <Button type="variant" className="cursor-pointer hover:bg-black/80" onClick={() => { setPage(<Form2 />); setPage1(true) }}>Save & Continue</Button>
                </div>
            </div>
        )
    }

    function Form2() {
        const { values } = useContext(InputContext);
        const router = useRouter();

        const submit = async () => {
            setPage2(true);
            await addData("list_collections_main", values).then(() => toast.success("Form submitted successfully.")).then(() => router.push("/dashboard"));
        }

        return (
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-[20px]">
                    <FormInput title="Price (VND)" type="number" placeholder="Price" collection_name="Price" />
                    <FormInput title="Calculation" type="number" placeholder="Calculation" collection_name="Calculation" />
                    <FormInput title="Contract Terms" type="text" placeholder="Terms" collection_name="ContractTerms" />
                    <FormInput title="Deposit / Payment Terms" type="text" placeholder="Terms" collection_name="DepositPaymentTerms" />
                    <FormInput title="Maintenance Fee / Service Charge" type="number" placeholder="Charge" collection_name="MaintenanceFeeServiceCharge" />
                    <FormInput title="Available From" type="date" placeholder="Available From" collection_name="AvailableFrom" />
                    <FormInput title="Description" type="text" placeholder="Description" collection_name="Description" />
                    <DropDownInput title="Highlight / Featured" collection_name="HighlightFeatured" />
                    <FormInput title="Social Media Sharing Links" type="text" placeholder="Links" collection_name="Links" />
                    <FormInput title="Property Images" type="url" placeholder="URL" collection_name="PropertyImages" />
                    <DropDownInput title="Gallery Categories" collection_name="GalleryCategories" />
                    <FormInput title="Floor Plan" type="file" placeholder="Floor Plan" collection_name="FloorPlan" />
                    <FormInput title="Property Video" type="url" placeholder="URL" collection_name="PropertyVideo" />
                    <FormInput title="Landlord Name" type="text" placeholder="Landlord Name" collection_name="LandlordName" />
                    <FormInput title="Landlord Phone" type="text" placeholder="Landlord Phone" collection_name="LandlordPhone" />
                    <FormInput title="Landlord Email" type="text" placeholder="Landlord Email" collection_name="LandlordEmail" />
                    <DropDownInput title="Owner Type" collection_name="OwnerType" />
                    <FormInput title="Landlord Notes" type="text" placeholder="Landlord Notes" collection_name="LandlordNotes" />
                    <FormInput title="Bank Info" type="text" placeholder="Bank Info" collection_name="BankInfo" />
                    <FormInput title="Property Consultant Name" type="text" placeholder="Property Consultant Name" collection_name="PropertyConsultantName" />
                    <FormInput title="Property Consultant Phone" type="text" placeholder="Property Consultant Phone" collection_name="PropertyConsultantPhone" />
                    <FormInput title="Agent Email" type="text" placeholder="Agent Email" collection_name="AgentEmail" />
                    <FormInput title="Internal Notes" type="text" placeholder="Internal Notes" collection_name="InternalNotes" />
                    <FormInput title="Auto Expiry Date" type="date" placeholder="Auto Expiry Date" collection_name="AutoExpiryDate" />
                    <DropDownInput title="Land Use Type" collection_name="LandUseType" />
                    <DropDownInput title="Utilities Included" collection_name="UtilitiesIncluded" />
                    <FormInput title="Incentives / Promotions" type="text" placeholder="Incentives / Promotions" collection_name="IncentivesPromotions" />
                    <FormInput title="Multi-language Support" type="text" placeholder="Multi-language Support" collection_name="MultilanguageSupport" />
                    <FormInput title="Currency Toggle" type="text" placeholder="Currency Toggle" collection_name="CurrencyToggle" />
                    <FormInput title="Developer Name" type="text" placeholder="Developer Name" collection_name="DeveloperName" />
                    <FormInput title="Project Completion Date" type="year" placeholder="Project Completion Date" collection_name="ProjectCompletionDate" />
                    <DropDownInput title="Project Facilities" collection_name="ProjectFacilities" />
                </div>
                <div className="w-full flex justify-end">
                    <Button onClick={submit} type="variant" className="cursor-pointer hover:bg-black/80">Save & Submit</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-row min-h-screen">
            <div className="min-w-[18%] bg-accent p-[20px] flex flex-col items-start gap-[8px]">
                <div onClick={() => { setPage(<Form1 />) }} className="p-[4px] rounded-[7px] cursor-pointer w-full flex items-center justify-between font-semibold hover:bg-black/5">
                    <button className="cursor-pointer flex flex-row gap-[10px] items-center"><AirVent className="w-4 h-4" /> Properties & Amenities</button>
                    {page1 ? <CircleCheckBig className="w-4 h-4 text-green-600" /> : ""}
                </div>
                <div onClick={() => { setPage(<Form2 />) }} className="p-[4px] rounded-[7px] cursor-pointer w-full flex items-center justify-between font-semibold hover:bg-black/5">
                    <button className="cursor-pointer flex flex-row gap-[10px] items-center"><BadgeIndianRupee className="w-4 h-4" /> Price & Details</button>
                    {page2 ? <CircleCheckBig className="w-4 h-4 text-green-600" /> : ""}
                </div>
            </div>
            <div className="p-[20px] w-[82%] overflow-y-auto max-h-screen">
                {page}
            </div>
            <Toaster />
        </div>
    );
}

export default function page() {
    return (
        <PageProvider>
            <Pagination />
        </PageProvider>
    )
};
