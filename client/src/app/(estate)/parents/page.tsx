import ParentCard from "@/components/cards/ParentCard";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Minders Haven | Parents",
	description:
		"Authenticated users can view basic information about other tenants within the property. Tenants can also search for other tenants",
};

function ParentsPageContent() {
	return (
		<div>
			<ParentCard />
		</div>
	);
}

export default function ParentsPage() {
	return (
		<ProtectedRoute>
			<ParentsPageContent />
		</ProtectedRoute>
	);
}