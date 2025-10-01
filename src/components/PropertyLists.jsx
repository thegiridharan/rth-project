"use client";
import { Plus, Search } from "lucide-react";

export default function PropertyLists() {
    return (
        <div className="p-[15px]">
            <div className="flex w-full justify-between">
                <div className="flex h-[40px] p-[12px] items-center outline-1 outline-gray-200 rounded-full w-[calc(20%)]">
                    <input placeholder="Search here.." className="outline-none border-none opacity-70 w-full" />
                    <Search className="h-4 w-4 opacity-50" />
                </div>
                <a href="/dashboard/new-record" className="flex h-[40px] p-[10px] gap-[5px] items-center justify-evenly bg-black text-white rounded-[7px] w-[calc(18%)] cursor-pointer hover:bg-black/80">
                    <Plus className="h-4 w-4" />
                    <p>Create Property Listing</p>
                </a>
            </div>
        </div>
    )
};
