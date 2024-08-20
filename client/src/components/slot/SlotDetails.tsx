"use client";

import {
	useDeleteSlotMutation,
	useGetSingleSlotQuery,
} from "@/lib/redux/features/slots/slotApiSlice";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { extractErrorMessage } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { AuthFormHeader } from "../forms/auth";
import { CheckCheck, CircleDot, EyeIcon, Hotel } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface SlotDetailsProps {
	params: {
		id: string;
	};
}

export default function SlotDetails({ params }: SlotDetailsProps) {
	const id = params.id;
	const { data } = useGetSingleSlotQuery(id);
	const slot = data?.slot;
	const router = useRouter();

	const { data: currentUser } = useGetUserProfileQuery();

	const canUpdate = slot?.assigned_to === currentUser?.profile.full_name;

	const canDelete = slot?.created_by === currentUser?.profile.full_name;

	const [deleteIssue] = useDeleteSlotMutation();

	const handleDeleteSlot = async () => {
		if (slot?.id) {
			try {
				await deleteIssue(slot.id).unwrap();
				router.push("/profile");
				toast.success("Your Slot was deleted");
			} catch (e) {
				const errorMessage = extractErrorMessage(e);
				toast.error(errorMessage || "An error occurred");
			}
		}
	};
	return (
		<Card className="dark:border-gray rounded-xl border border-dashed">
			<AuthFormHeader
				title="Slot Details"
				linkText="Go back to profile"
				linkHref="/profile"
			/>

			<CardHeader className="border-b-eerieBlack flex flex-row justify-between gap-4 border-b p-4 sm:p-6 md:flex-row md:items-center md:gap-6 ">
				<div className="grid gap-0.5">
					<CardDescription className="mt-2">
						<p className="flex items-center space-x-2">
							<CheckCheck className="tab-icon" />
							<span className="text-xl-font-baby">Submitted By: </span>
							<span className="text-xl-font-baby">{slot?.created_by}</span>
						</p>
					</CardDescription>
				</div>

				<div className="flex flex-col gap-y-3">
					{canUpdate && (
						<Link href={`/slot/update-slot/${id}`}>
							<Button
								className="bg-electricIndigo text-babyPowder dark:bg-electricIndigo dark:text-babyPowder ml-auto h-10 max-w-[200px] sm:ml-0 md:max-w-[300px]"
								size="sm"
								variant="outline"
							>
								Update Slot
							</Button>
						</Link>
					)}

					{canDelete && (
						<Button
							onClick={handleDeleteSlot}
							className="text-babyPowder dark:text-babyPowder ml-auto h-10 max-w-[200px] bg-red-500 sm:ml-0 md:max-w-[300px] dark:bg-red-500"
							size="sm"
							variant="outline"
						>
							Delete Slot
						</Button>
					)}
				</div>
			</CardHeader>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Slot Date: </strong>{slot?.slot_date}</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Slot Time: </strong>{slot?.slot_time}</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Duration: </strong>{slot?.duration}hrs</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Number of Kids: </strong>{slot?.number_of_kids}</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Kids Age: </strong>{slot?.kids_age}</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Prefered Location: </strong>{slot?.location}</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Amount to be paid: </strong>£{slot?.total_price}</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Additional Info: </strong>{slot?.additional_info}</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Slot Status: </strong>{slot?.status}</span>
					</div>
				</CardDescription>
			</CardContent>

			<CardContent className="border-b-eerieBlack border-b">
				<CardDescription className="mt-3">
					<div className="flex items-center space-x-2">
						<CircleDot className="tab-icon" />
						<span className="text-l-font-baby"><strong>Assigned To: </strong>{slot?.assigned_to || "Not assigned Yet!"}</span>
					</div>
				</CardDescription>
			</CardContent>
		</Card>
	);
}