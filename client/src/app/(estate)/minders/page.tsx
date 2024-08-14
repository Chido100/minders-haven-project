import MinderCard from "@/components/cards/MinderCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Minders Haven | Minders",
	description:
		"Parents/Guardians can see a list of minders and their rating",
};

export default function MindersPage() {
	return (
		<>
			<MinderCard />
		</>
	);
}