"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import { PackagePlusIcon, TruckIcon, SettingsIcon, DownloadIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { NewDropModal } from "./new-drop-modal";

export function QuickActions({ onProductAdded }) {
    const [isDropModalOpen, setIsDropModalOpen] = useState(false);

    const actions = [{
        title: "Launch New Drop",
        description: "Create a new product.",
        onClick: () => setIsDropModalOpen(true),
        icon: (
            <PackagePlusIcon aria-hidden="true" />
        ),
    }, {
        title: "Review unfulfilled",
        description: "Orders waiting to ship.",
        href: "#",
        icon: (
            <TruckIcon aria-hidden="true" />
        ),
    }, {
        title: "Store settings",
        description: "Payments, checkouts etc.",
        href: "#",
        icon: (
            <SettingsIcon aria-hidden="true" />
        ),
    }, {
        title: "Export sales",
        description: "CSV for accountings.",
        href: "#",
        icon: (
            <DownloadIcon aria-hidden="true" />
        ),
    }];

	return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Quick actions</CardTitle>
                    <CardDescription>Shortcuts to same destinations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ItemGroup className="gap-0">
                        {actions.map((a) => (
                            <Item 
                                key={a.title} 
                                size="sm" 
                                render={a.onClick ? <button onClick={a.onClick} className="w-full text-left" /> : <Link href={a.href} />}
                            >
                                <ItemMedia variant="icon">{a.icon}</ItemMedia>
                                <ItemContent>
                                    <ItemTitle>{a.title}</ItemTitle>
                                    <ItemDescription className="line-clamp-1">
                                        {a.description}
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <ChevronRightIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                                </ItemActions>
                            </Item>
                        ))}
                    </ItemGroup>
                </CardContent>
            </Card>

            <NewDropModal 
                isOpen={isDropModalOpen} 
                onClose={() => setIsDropModalOpen(false)} 
                onSuccess={onProductAdded}
            />
        </>
    );
}
