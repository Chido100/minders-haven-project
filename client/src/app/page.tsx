import type { Metadata } from "next";
import Image from "next/image";
import minders_haven_background from "@/../public/assets/images/minders_haven_backgroung.png";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";


export const metadata: Metadata = {
	title: "Home | Minders Haven",
	description:
		"Minders Haven Home Page. Create your account to get started.",
};

export default function HomePage() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <Image
            src={minders_haven_background}
            alt="Minders Haven"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
        />
      </div>
      <main className="flex-center relative z-10 h-full bg-black/50">
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
					</p>
					
					<Link href="/register" prefetch={false}>
						<button className="electricIndigo-gradient rounded-3xl px-4 py-2 text-lg font-semibold text-white hover:bg-purple-700 sm:px-6 sm:text-2xl">
							<span className="inline-flex items-center">
								Create Your Account
								<ArrowRightIcon className="ml-2 size-6" />
							</span>
						</button>
					</Link>
					<Link href="/login" prefetch={false}>
						<button className="electricIndigo-gradient rounded-3xl px-4 py-2 text-lg font-semibold text-white hover:bg-purple-700 sm:px-6 sm:text-2xl">
							<span className="inline-flex items-center">
								Sign In
								<ArrowRightIcon className="ml-2 size-6" />
							</span>
						</button>
					</Link>
				</div>
			</main>
    </div>
  );
}
