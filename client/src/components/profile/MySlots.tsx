"use client";

import { useGetMySlotsQuery } from "@/lib/redux/features/slots/slotApiSlice";
import React from "react";
import Spinner from "../shared/Spinner";
import { TabsContent } from "../ui/tabs";
import SlotCard from "@/components/cards/SlotCard";

export default function Slots() {
	const { data, isLoading } = useGetMySlotsQuery();
	const mySlot = data?.my_slots;

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}
	return (
		<TabsContent value="my-slots">
			<h2 className="h2-semibold flex-center font-robotoSlab dark:text-pumpkin text-xl">
				Total: ({mySlot?.count})
			</h2>
			<div className="mt-4 grid cursor-pointer grid-cols-1 gap-4 p-1.5 md:grid-cols-2 lg:grid-cols-3">
				{mySlot && mySlot.results.length > 0 ? (
					mySlot.results.map((slot) => (
						<SlotCard key={slot.id} slot={slot} />
					))
				) : (
					<p className="h2-semibold dark:text-lime-500">
						You have not requested any Slot(s) yet!
					</p>
				)}
			</div>
		</TabsContent>
	);
}