import SlotDetails from "@/components/slot/SlotDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Minders Haven | Slot Details",
	description:
		"Authenticated uses can get the details of the slot they have created. They can also delete the slot",
};

interface ParamsProps {
	params: {
		id: string;
	};
}

export default function SlotDetailPage({ params }: ParamsProps) {
	return (
		<div>
			<SlotDetails params={params} />
		</div>
	);
}