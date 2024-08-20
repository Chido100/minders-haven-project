"use client";

import { useGetMyAssignedSlotsQuery } from "@/lib/redux/features/slots/slotApiSlice";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import React from "react";
import Spinner from "../shared/Spinner";
import { TabsContent } from "../ui/tabs";
import SlotCard from "../cards/SlotCard";
import { useRouter } from "next/router";

export default function AssignedSlots() {
	const { data: assignedSlots, isLoading } = useGetMyAssignedSlotsQuery("");

	const myAssignedSlots = assignedSlots?.assigned_slots;

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<TabsContent value="assigned-slots">
			<h2 className="h2-semibold flex-center font-robotoSlab dark:text-pumpkin text-xl">
				Total: ({myAssignedSlots?.count})
			</h2>
			<div className="mt-4 grid cursor-pointer grid-cols-1 gap-4 p-1.5 md:grid-cols-2 lg:grid-cols-3">
				{myAssignedSlots && myAssignedSlots.results.length > 0 ? (
					myAssignedSlots.results.map((slot) => (
						<SlotCard key={slot.id} slot={slot} />
					))
				) : (
					<p className="h2-semibold dark:text-lime-500">
						No Slot(s) Assigned to you!
					</p>
				)}
			</div>
		</TabsContent>
	);

}