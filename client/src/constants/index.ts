import { LeftNavLink } from "@/types";

// Import your IssueData interface if it's defined in another file
// import { IssueData } from '@/types';

type OptionType = {
	value: "reported" | "resolved" | "in_progress" | "parent_location" | "minder_location";
	label: string;
};

export const statusOptions: OptionType[] = [
	{ value: "reported", label: "Reported" },
	{ value: "resolved", label: "Resolved" },
	{ value: "in_progress", label: "In Progress" },
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
	{
		path: "/parents",
		label: "Parents",
		imgLocation: "/assets/icons/parents.svg",
	},

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

	
	{
		path: "/bookmark",
		label: "Bookmarked Posts",
		imgLocation: "/assets/icons/bookmark.svg",
	},

	{
		path: "/add-post",
		label: "Create a Post...",
		imgLocation: "/assets/icons/question-file.svg",
	},

];