import ProtectedRoute from "@/components/shared/ProtectedRoutes";

import React from "react";

import type { Metadata } from "next";
import Header from "@/components/profile/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "@/components/profile/About";
import Posts from "@/components/profile/Posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Slots from "@/components/profile/Slots"
import AssignedSlots from "@/components/profile/AssignedSlots";


export const metadata: Metadata = {
	title: "Minders Haven | User Profile",
	description: "Signed in users can view all their profile information",
};

function ProfilePageContent() {
	return (
		<>
			<div className="grid items-start gap-4 px-4 pb-4 md:gap-6 md:px-6">
				<Header />

				{/* the tabs */}
				<div className="w-full">
					<Tabs
						className="dark:border-eerieBlack rounded-lg border"
						defaultValue="about"
					>
						<TabsList className="bg-baby_rich flex space-x-4">
							<TabsTrigger value="about" className="h3-semibold tab">
								About
							</TabsTrigger>
							<TabsTrigger value="my-slots" className="h3-semibold tab">
								My Slots
							</TabsTrigger>
							<TabsTrigger value="assigned-slots" className="h3-semibold tab">
								Assigned Slots
							</TabsTrigger>
						</TabsList>

						{/* about tabs content */}
						<About />

						{/* slot tab content */}
						<Slots />
						
						{/* assigned slots tab content */}
						<AssignedSlots />
						
					</Tabs>
				</div>
			</div>
			<div className="flex cursor-pointer flex-row justify-between">
				<Link href="/profile/edit">
					<Button className="h3-semibold electricIndigo-gradient text-babyPowder w-64 rounded-lg">
						Update Profile
					</Button>
				</Link>
			</div>
		</>
	);
}

export default function ProfilePage() {
	return (
		<ProtectedRoute>
			<ProfilePageContent />
		</ProtectedRoute>
	);
}