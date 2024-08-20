import Link from "next/link";
import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CircleDot, Hotel } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Slot {
	id: string;
	created_by: string;
	slot_date: Date;
	slot_time: string;
	duration: string;
	number_of_kids: string;
	kids_age: string;
	location: "parent_location" | "minder_location";
	additional_info?: string;
	status: "created" | "completed" | "in_review";
	view_count: number;
	assigned_to?: string;
}

interface SlotCardProps {
	slot: Slot;
}

export default function SlotCard({ slot }: SlotCardProps) {
	return (
		<Link href={`/slot/${slot.id}`} key={slot.id}>
			<Card
				key={slot.id}
				className="hover:border-pumpkin dark:border-gray hover:dark:border-platinum rounded-xl border border-dashed"
			>
				<CardHeader>
					<CardTitle className="flex-center h3-semibold font-robotoSlab dark:text-lime-500">
						{slot.slot_date
							? `${slot.slot_date}....`
							: slot.slot_date}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="dark:text-platinum">
						<p className="h4-semibold">
							{slot.slot_time
								? `${slot.slot_time}....`
								: slot.slot_time}
						</p>
					</CardDescription>
				</CardContent>

				<CardContent>
					<CardDescription className="dark:text-platinum">
						<p className="flex items-center space-x-2">
							<CircleDot className="tab-icon" />
							<span className="tab-font">Duration: </span>
							<span className="text-lg">{slot.duration}</span>
						</p>
					</CardDescription>
				</CardContent>

                <CardContent>
					<CardDescription className="dark:text-platinum">
						<p className="flex items-center space-x-2">
							<CircleDot className="tab-icon" />
							<span className="tab-font">Number of Kids: </span>
							<span className="text-lg">{slot.number_of_kids}</span>
						</p>
					</CardDescription>
				</CardContent>

                <CardContent>
					<CardDescription className="dark:text-platinum">
						<p className="flex items-center space-x-2">
							<CircleDot className="tab-icon" />
							<span className="tab-font">Kids Age: </span>
							<span className="text-lg">{slot.kids_age}</span>
						</p>
					</CardDescription>
				</CardContent>

                

				<CardFooter className="dark:text-babyPowder flex flex-row justify-between">
					<p>
						<span className="mr-0.5 font-bold">Status: </span>
						<Badge className="bg-eerieBlack text-babyPowder dark:bg-electricIndigo dark:text-babyPowder">
							{slot.status}
						</Badge>
					</p>
				</CardFooter>
			</Card>
		</Link>
	);
}