"use server";

import Settings from "./(components)/settings";



export default async function SettingsPage() {
    return (
        <div className="flex justify-center items-start md:p-6">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-white text-center">
                    Settings
                </h2>
                <Settings />
            </div>
        </div>
    );
}