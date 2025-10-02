"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addDoc } from "firebase/firestore";
import { addData, deleteData, getData } from "@/firebase/firestoreService";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { Delete, Trash, Trash2 } from "lucide-react";

function Block({ title, collection_name }) {
    const [project, setProject] = useState(null);
    const [data, setData] = useState(null);
    const [id, setId] = useState("");
    const collections = collection_name;

    useEffect(() => {
        async function done() {
            try {
                const result = await getData(collections);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        done();
    }, [id, data]);

    const insertData = (doc) => {
        if (doc["option"] !== null) {
            addData(collections, doc).then((res) => toast.success("Document successfully added.")).then(() => setProject(null));
        } else {
            toast.success("Fill the data and click 'Add' Button");
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            insertData({ option: project });
        }
    }

    const deleteDatum = (id) => {
        setId(id);
        deleteData(collections, id).then((res) => toast.success("Document deleted successfully."));
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-[350px] p-[10px] outline-1 outline-gray-200 rounded-[4px] flex flex-col gap-[10px]">
                <p className="font-semibold">{title}</p>
                <div className="flex flex-row gap-[5px]">
                    <Input value={project || ""} type="text" placeholder="Type here.." onChange={(e) => setProject(e.target.value)} onKeyDown={handleKeyDown} />
                    <Button type="variant" onClick={() => { insertData({ option: project }) }} className="cursor-pointer">Add</Button>
                </div>
                { }
                <div className="h-[150px] flex flex-col gap-[6px] overflow-auto">
                    {data !== null && data.map((item, index) => (
                        <div key={index} className="flex flex-row items-center justify-between p-[6px] hover:bg-black/10 bg-black/5 rounded-[4px]">
                            <p>{item["option"]}</p>
                            <Trash2 className="h-4 w-4 hover:text-red-600 cursor-pointer" onClick={() => deleteDatum(item.id)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Master() {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-[25px] p-[25px]">
            <Block title="Project / Community" collection_name="ProjectCommunity" />
            <Block title="Zone / Sub-area" collection_name="ZoneSubarea" />
            <Block title="Transaction Type" collection_name="TransactionType" />
            <Block title="Property Type" collection_name="PropertyType" />
            <Block title="Availability Status" collection_name="AvailabilityStatus" />
            <Block title="Furnishing" collection_name="Furnishing" />
            <Block title="Orientation" collection_name="Orientation" />
            <Block title="Amenities" collection_name="Amenities" />
            <Block title="View" collection_name="View" />
            <Block title="Parking Availability" collection_name="ParkingAvailability" />
            <Block title="Pet Policy" collection_name="PetPolicy" />
            <Block title="Owner Type" collection_name="OwnerType" />
            <Block title="Land Use Type" collection_name="LandUseType" />
            <Block title="Highlight / Featured" collection_name="HighlightFeatured" />
            <Block title="Gallery Categories" collection_name="GalleryCategories" />
            <Block title="Utilities Included" collection_name="UtilitiesIncluded" />
            <Block title="Project Facilities" collection_name="ProjectFacilities" />
            <Toaster />
        </div>
    )
};
