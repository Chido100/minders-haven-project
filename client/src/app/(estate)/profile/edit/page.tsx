import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Minders Haven | Profile Edit",
	description: "Signed in users can edit their profile information",
};

export default function EditProfilePage() {
	return (
		<div>
			<AuthFormHeader title="Update Profile" />
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-lightGrey dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
					<h1 className="dark:text-babyPowder text-6xl">Edit Profile</h1>
				</div>
			</div>
		</div>
	);
}