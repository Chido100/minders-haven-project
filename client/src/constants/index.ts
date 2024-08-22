import { LeftNavLink } from "@/types";

// Import your IssueData interface if it's defined in another file
// import { IssueData } from '@/types';

type OptionType = {
	value: "created" | "completed" | "in_review" | "parent_location" | "minder_location";
	label: string;
};

export const statusOptions: OptionType[] = [
	{ value: "created", label: "Created" },
	{ value: "completed", label: "Completed" },
	{ value: "in_review", label: "In Review" },
];

export const locationOptions: OptionType[] = [
	{ value: "parent_location", label: "Parent Location" },
	{ value: "minder_location", label: "Minder Location" },
];

export const occupationOptions = [
	{ value: "parent", label: "Parent" },
	{ value: "minder", label: "Minder" },
];

export const leftNavLinks: LeftNavLink[] = [
	{
		path: "/welcome",
		label: "Home",
		imgLocation: "/assets/icons/home.svg",
	},
	{
		path: "/profile",
		label: "Profile",
		imgLocation: "/assets/icons/user-profile.svg",
	},
	// {
	//	path: "/parents",
	//	label: "Parents",
	//	imgLocation: "/assets/icons/parents.svg",
	// },

	{
		path: "/minders",
		label: "Minders",
		imgLocation: "/assets/icons/minders.svg",
	},
	{
		path: "/create-slot",
		label: "Create Slot",
		imgLocation: "/assets/icons/report.svg",
	},

	// {
	//	path: "/contact-us",
	//	label: "Become a Childminder",
	//	imgLocation: "/assets/icons/question-file.svg",
	// },

	
	{
		path: "/bookmark",
		label: "Bookmarked Posts",
		imgLocation: "/assets/icons/minders.svg",
	},

	// {
	//	path: "/add-post",
	//	label: "Create a Post...",
	//	imgLocation: "/assets/icons/question-file.svg",
	// },

];