"use client";
import * as React from "react";
import { Blocks, Database, GalleryVerticalEnd, HousePlus } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user";
import { OptionContext } from "@/utils/context";

const data = {
    user: {
        name: "Giridharan",
        email: "thegiridharan.work@gmail.com",
        avatar: "https://camo.githubusercontent.com/005fc5d7d32b75cddea75ae954aa1ac517919feafc78340001443abf87b31033/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f616c6f68652f617661746172732f706e672f6d656d6f5f33342e706e67",
    },
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            items: [
                { title: "Manage Property", url: "#", icon: HousePlus, title_name: "manage_property" },
                { title: "Master Data", url: "#", icon: Database, title_name: "master_data" },
            ],
        },
    ],
}

export function AppSidebar({ ...props }) {

    const { option, changeOption } = React.useContext(OptionContext);

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Blocks className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">Dashboard</span>
                                    <span className="">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                {item.items?.length ? (
                                    item.items.map((subItem, index) => (
                                        <SidebarMenuButton key={index} className="cursor-pointer" onClick={() => changeOption(subItem.title_name)}>
                                            {subItem.icon && <subItem.icon />}
                                            <a key={index} href={subItem.url} className="font-medium">
                                                {subItem.title}
                                            </a>
                                        </SidebarMenuButton>
                                    ))
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
