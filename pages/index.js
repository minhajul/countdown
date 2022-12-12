import * as React from "react";
import Head from "next/head";

function calculateTime() {
    const year = new Date().getFullYear();
    const difference = +new Date(`${year}-12-28`) - +new Date();
    let timeLeft = [];

    if (difference > 0) {
        timeLeft['days'] = Math.floor(difference / (1000 * 60 * 60 * 24));
        timeLeft['hours'] = Math.floor((difference / (1000 * 60 * 60)) % 24);
        timeLeft['minutes'] = Math.floor((difference / 1000 / 60) % 60);
        timeLeft['seconds'] = Math.floor((difference / 1000) % 60);
    }

    return timeLeft;
}

export default function Home() {
    const [timeLeft, setTimeLeft] = React.useState(calculateTime());

    React.useEffect(() => {
        const id = setTimeout(() => {
            setTimeLeft(calculateTime());
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    });

    const timerComponents = Object.keys(timeLeft).map(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        return true;
    });

    return (
        <div className="bg-gray-900">
            <Head>
                <title> 
                    {timerComponents.length ? "Boss is Coming :)" : "Wait is over. Boss is here :)" }
                </title>
            </Head>

            <main className="relative max-w-4xl mx-auto px-10 py-20 min-h-screen flex flex-col justify-center">
                {timerComponents.length ?
                    <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4 lg:col-span-1 text-center bg-blue-400 p-10 rounded-md shadow-md">
                            <span className="text-7xl">{ timeLeft['days'] }</span>
                            <span className="block text-sm">Days</span>
                        </div>

                        <div className="col-span-4 lg:col-span-1 text-center bg-blue-400 p-10 rounded-md shadow-md">
                            <span className="text-7xl">{ timeLeft['hours'] }</span>
                            <span className="block text-sm">Hours</span>
                        </div>

                        <div className="col-span-4 lg:col-span-1 text-center bg-blue-400 p-10 rounded-md shadow-md">
                            <span className="text-7xl">{ timeLeft['minutes'] }</span>
                            <span className="block text-sm">Minutes</span>
                        </div>

                        <div className="col-span-4 lg:col-span-1 text-center bg-blue-400 p-10 rounded-md shadow-md">
                            <span className="text-7xl">{ timeLeft['seconds'] }</span>
                            <span className="block text-sm">Seconds</span>
                        </div>
                    </div>
               : <h2 className="text-white text-4xl italic">Wait is over. Boss is here :)</h2>}

                <p className="absolute bottom-0 text-white text-xs pt-3 pb-5">
                    Copyright @2022 <a href="https://minhajul.vercel.app/">MD Minhajul Islam</a>. All rights reserved.
                </p>
            </main>
        </div>
    )
}
