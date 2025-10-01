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
import { getData } from "@/firebase/firestoreService";
import { AirVent, BadgeIndianRupee, CircleCheckBig } from "lucide-react";
import { useEffect, useState } from "react";

function NormalInput({ title, collection_name }) {
    const [position, setPosition] = useState("Select an option");
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
            <p className="flex gap-[4px]">
                {title}<span className="text-red-600">*</span>
            </p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{`${capitalize(position)}`}</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                    >
                        {data && data.map((item, index) => (<DropdownMenuRadioItem key={index} value={item.option}>{item.option}</DropdownMenuRadioItem>))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function Page1() {
    const [position, setPosition] = useState("Select an option");
    const [data, setData] = useState(null);
    const collections = "ProjectCommunity";

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        async function get() {
            setData(await getData(collections));
        }
        get();
    }, []);

    return (
        <>
            <div className="p-[10px] flex flex-col gap-[10px] w-[250px]">
                <p className="flex gap-[4px]">
                    Property ID<span className="text-red-600">*</span>
                </p>
                <p className="cursor-not-allowed px-[12px] py-[8px] rounded-[7px] bg-black/5">
                    EV-0001
                </p>
            </div>

            <div className="p-[10px] flex flex-col gap-[10px] w-[250px]">
                <p className="flex gap-[4px]">
                    Old Ref. No<span className="text-red-600">*</span>
                </p>
                <Input type="text" placeholder="No" />
            </div>

            <div className="p-[10px] flex flex-col gap-[10px] w-[250px]">
                <p className="flex gap-[4px]">
                    Project / Community<span className="text-red-600">*</span>
                </p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">{`${capitalize(position)}`}</Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup
                            value={position}
                            onValueChange={setPosition}
                        >
                            {data && data.map((item, index) => (<DropdownMenuRadioItem key={index} value={item.option}>{item.option}</DropdownMenuRadioItem>))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}

export default function Page() {
    const [page1, setPage1] = useState(false);
    const [page2, setPage2] = useState(false);
    const [page, setPage] = useState(<Page1 />);

    return (
        <>
            <div className="flex flex-row w-full">
                <div className="w-[16%] bg-accent min-h-screen p-[20px] flex flex-col items-start gap-[8px]">
                    <button className="p-[4px] rounded-[7px] cursor-pointer w-full flex items-center justify-between font-semibold hover:bg-black/5">
                        <AirVent className="w-4 h-4" /> Properties & Amenities
                        {page1 ? <CircleCheckBig className="w-4 h-4" /> : ""}
                    </button>
                    <button className="p-[4px] rounded-[7px] cursor-pointer w-full flex items-center justify-between font-semibold hover:bg-black/5">
                        <BadgeIndianRupee className="w-4 h-4" /> Price & Details{" "}
                        {page2 ? <CircleCheckBig className="w-4 h-4" /> : ""}
                    </button>
                </div>
                <div className="p-[20px]">
                    <NormalInput title="Project / Community" collection_name="ProjectCommunity" />
                </div>
            </div>
        </>
    );
}
