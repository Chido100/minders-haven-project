import PostCard from "@/components/cards/PostCard";
import type { Metadata } from "next";



export const metadata: Metadata = {
	title: "Minders Haven | Welcome",
	description:
		"Welcome to Minders Haven.",
};


export default function WelcomePage() {
	return (		
		<>
			<PostCard />
		</>
	);
}
