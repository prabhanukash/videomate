import React from 'react';
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">The Video & Image Creation API</h1>
                <p className="text-xl md:text-2xl mb-8">VideoMate is the media automation platform for developers and no-code users.</p>
                <div className="flex justify-center space-x-4">
                    <Link href="/api-key">
                        <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                            Get API Key
                        </Button>
                    </Link>
                    <Link href="/docs">
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                            View Docs
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
