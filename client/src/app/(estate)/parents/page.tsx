"use client";
import Spinner from "@/components/shared/Spinner";
import { useGetAllUsersQuery } from "@/lib/redux/features/users/usersApiSlice";
import React from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";


function ParentsPageContent() {
    const {data, isLoading}= useGetAllUsersQuery({})
    if (isLoading) {
        return (
            <div className="flex-center pt-32">
                <Spinner size="xl"/>
            </div>
        )
    }
    return (
        <div>
            <h1 className="dark:text-pumpkin text-6xl">Parents</h1>
            {data && data.profiles.results.length > 0 ? (
                data.profiles.results.map((parent)=>(
                    <p key={parent.id} className="text-2xl dark:text-lime-500">{parent.full_name} - {parent.occupation}</p>
                ))
            ):(
                <p>No Parents Found.</p>
            )}
        </div>
    )
    
}

export default function ParentsPage() {
	return (
		<ProtectedRoute>
            <ParentsPageContent />
        </ProtectedRoute>
	);
}