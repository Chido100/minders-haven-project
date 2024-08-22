import React from "react";
import type { Metadata } from "next";
import { AuthFormHeader } from "@/components/forms/auth";
import UpdateSlotForm from "@/components/forms/update-slot/UpdateSlotForm";

export const metadata: Metadata = {
	title: "Minders Haven | Update Slot ",
	description:
		"Minders assigned to a slot can update the status of the slot",
};

interface UpdateParamsProps {
	params: {
		id: string;
	};
}

export default function UpdateSlotPage({ params }: UpdateParamsProps) {
	return (
		<div>
			<AuthFormHeader
				title="Update Slot"
				staticText="Want to go back?"
				linkText="Back to Profile"
				linkHref="/profile"
			/>
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-lightGrey dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
					<UpdateSlotForm params={params} />
				</div>
			</div>
		</div>
	);
}