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
import { Hotel } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Slot {
	id: string;
	created_by: string;
	slot_date: Date;
	slot_time: string;
	duration: number;
	number_of_kids: number;
	kids_age: number;
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
							<Hotel className="tab-icon" />
							<span className="tab-font">Duration: </span>
							<span className="text-lg">{slot.duration}</span>
						</p>
					</CardDescription>
				</CardContent>

                <CardContent>
					<CardDescription className="dark:text-platinum">
						<p className="flex items-center space-x-2">
							<Hotel className="tab-icon" />
							<span className="tab-font">Number of Kids: </span>
							<span className="text-lg">{slot.number_of_kids}</span>
						</p>
					</CardDescription>
				</CardContent>

                <CardContent>
					<CardDescription className="dark:text-platinum">
						<p className="flex items-center space-x-2">
							<Hotel className="tab-icon" />
							<span className="tab-font">Kids Age: </span>
							<span className="text-lg">{slot.kids_age}</span>
						</p>
					</CardDescription>
				</CardContent>

                <CardContent>
					<CardDescription className="dark:text-platinum">
						<p className="flex items-center space-x-2">
							<Hotel className="tab-icon" />
							<span className="tab-font">Location: </span>
							<span className="text-lg">{slot.location}</span>
						</p>
					</CardDescription>
				</CardContent>

                <CardContent>
					<CardDescription className="dark:text-platinum">
						<p className="flex items-center space-x-2">
							<Hotel className="tab-icon" />
							<span className="tab-font">Additional Info: </span>
							<span className="text-lg">{slot.additional_info}</span>
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