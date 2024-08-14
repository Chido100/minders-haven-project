import CreateRatingForm from "@/components/forms/add-rating/CreateRatingForm";
import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Minders Haven | Add Rating",
	description:
		"Users can rate the childminders, if they are satisfied or dissatisfied with the services rendered to them",
};

export default function AddRatingPage() {
	return (
		<div>
			<AuthFormHeader
				title="Rate a Childminder"
				staticText="Tell us what you think about the services rendered"
				linkText="Back to Minders Page"
				linkHref="/minders"
			/>
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-lightGrey dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
					<CreateRatingForm />
				</div>
			</div>
		</div>
	);
}