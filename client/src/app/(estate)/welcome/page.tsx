import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Minders Haven | Welcome",
	description:
		"Welcome to the Minders Haven Website. This webapp allows parents/guardians to signup, create their profiles, and the best and nearest childminders within a short notice.",
};

export default function WelcomePage() {
	return (
		<h1 className="dark:text-ballonWhite text-6xl">Welcome</h1>
	);
}