"use client";

import { useGetAllPostsQuery } from "@/lib/redux/features/posts/postApiSlice";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { PostState } from "@/types";
import {
	formatDate,
	getRepliesText,
	getViewText,
	sortByDateDescending,
} from "@/utils";
import Spinner from "../shared/Spinner";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { formatDistanceToNow, parseISO } from "date-fns";
import { EyeIcon, HeartHandshakeIcon, MessageSquareQuoteIcon, NotebookPenIcon, UsersIcon } from "lucide-react";
import PaginationSection from "../shared/PaginationSection";



import Image from "next/image";
import newbackimage from "@/../public/assets/images/mindershavenback.png";

export default function PostCard() {
	const page = useAppSelector((state: PostState) => state.post.page);
	const { data, isLoading } = useGetAllPostsQuery({ page });

	const totalCount = data?.posts.count || 0;
	const totalPages = Math.ceil(totalCount / 9);

	const sortedPosts = sortByDateDescending(
		data?.posts.results ?? [],
		"created_at",
	);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<>
			{/* Image Section */}
			<div className="relative h-screen w-full">
				<Image
					src={newbackimage}
					alt="Minders Haven"
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					priority
				/>

				<main className="flex-center relative z-10 h-full bg-black/40">
					<div className="text-center">
						<h1 className="font-robotoSlab mb-4 text-4xl font-semibold text-white antialiased sm:text-6xl md:text-8xl">
							Welcome to Minders Haven
						</h1>
						<p className="my-8 text-2xl text-white sm:text-xl">
							Need a childminder urgently? Our platform connects you with trusted, 
							experienced childminders available at short notice, 
							ensuring your peace of mind and your child&apos;s safety. 
							Whether it&apos; a last-minute meeting or an unexpected event, 
							we&apos;ve got you covered with flexible, hassle-free booking options.
						</p><br></br>

						<br></br><p className="font-robotoSlab mt-6 text-xl text-white dark:text-indigo-500"><strong className="text-pear">Want to join our pool of Childminders?</strong> Send us an email.</p>		
					</div>
				</main>
				
			</div>


			{/* How it Works Section */}
			<div className="mt-7">
				<h1 className="font-robotoSlab text-center text-4xl dark:text-indigo-500">How it Works</h1>
				<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
					<Card className="dark:border-gray rounded-lg border">
						<CardHeader className="text-center">
							<div className="flex items-center justify-center space-x-2">
								<NotebookPenIcon className="size-6 text-indigo-600" />
								<span className="text-2xl">1</span>
							</div>
							<CardTitle className="text-2xl">Submit a request</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm">
								Fill out a simple request form with your needs and schedule and we&apos;ll find you the best match quickly.
							</p>
						</CardContent>
					</Card>
					<Card className="dark:border-gray rounded-lg border">
						<CardHeader className="text-center">
							<div className="flex items-center justify-center space-x-2">
								<UsersIcon className="size-6 text-indigo-600" />
								<span className="text-2xl">2</span>
							</div>
							<CardTitle className="text-2xl">Find a Childminder</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm">
								Receive notifications of available childminders who can meet your requirements.
							</p>
						</CardContent>
					</Card>
					<Card className="dark:border-gray rounded-lg border">
						<CardHeader className="text-center">
							<div className="flex items-center justify-center space-x-2">
								<HeartHandshakeIcon className="size-6 text-indigo-600" />
								<span className="text-2xl">3</span>
							</div>
							<CardTitle className="text-2xl">Peace of mind</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm">
								Enjoy your time away, feeling rest assured that your child is safe and well looked after by a trusted, experienced childminder.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>


			{/* Posts Section */}
			<div className="mt-7">
				<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
					<h1 className="font-robotoSlab text-3xl dark:text-indigo-500">
						Blog
					</h1>
				</div>

				<div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{sortedPosts && sortedPosts.length > 0 ? (
						sortedPosts.map((postItem) => (
							<Card
								key={postItem.id}
								className="dark:border-gray rounded-lg border"
							>
								<CardHeader className="dark:text-platinum w-full pb-4">
									<CardTitle className="font-robotSlab text-center text-2xl">
										{postItem.title.length > 25
											? `${postItem.title.substring(0, 25)}....`
											: postItem.title}
									</CardTitle>
									<CardDescription>
										<div className="flex flex-row justify-between">
											<div>
												<span>Posted on</span>
												<span className="ml-1 dark:text-indigo-500">
													{formatDate(postItem.created_at).toString()}
												</span>
											</div>
										</div>

										<div>
											<span>Last Updated</span>
											<span className="ml-1 dark:text-indigo-500">
												{formatDistanceToNow(parseISO(postItem.updated_at), {
													addSuffix: true,
												})}
											</span>
										</div>
									</CardDescription>
								</CardHeader>

								<CardContent className="border-t-deepBlueGrey dark:border-gray border-y py-4 text-sm">
									<p className="dark:text-platinum">
										{postItem.body.length > 65
											? `${postItem.body.substring(0, 65)}....`
											: postItem.body}
									</p>
								</CardContent>

								<div className="flex flex-row items-center justify-between p-2">
									<div className="">
										<Link href={`/post/${postItem.slug}`}>
											<Button size="sm" className="lime-gradient text-babyPowder">
												View Post
											</Button>
										</Link>
									</div>

									<div className="flex-row-center dark:text-platinum">
										<EyeIcon className="post-icon text-pumpkin mr-1" />
										{getViewText(postItem.view_count)}
									</div>

									<div className="flex-row-center dark:text-platinum">
										<MessageSquareQuoteIcon className="post-icon text-electricIndigo mr-1" />
										<span>{getRepliesText(postItem.replies_count)}</span>
									</div>
								</div>
							</Card>
						))
					) : (
						<p className="h2-semibold dark:text-lime-500">No Posts Found!</p>
					)}
				</div>

				<PaginationSection totalPages={totalPages} entityType="post" />
			</div>

			<footer className="relative mt-12 bg-black py-4 text-center text-white">
				<div className="container mx-auto flex justify-between px-4">
					<p className="text-left">
						Contact: <a href="mailto:support@mindershaven.com" className="underline">support@mindershaven.com</a>
					</p>
					<p className="text-right">
						&copy; {new Date().getFullYear()} Minders Haven. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
}

