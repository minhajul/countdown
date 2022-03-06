import * as React from "react";

function calculateTimeLeft() {
    const year = new Date().getFullYear();
    const difference = +new Date(`${year}-04-23`) - +new Date();
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
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    React.useEffect(() => {
        const id = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
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
            <main className="max-w-full mx-auto min-h-screen bg-gray-900 opacity-70">
                <div className="flex flex-col justify-center items-center absolute inset-40 ">
                    {timerComponents.length ?
                        <div className="grid grid-cols-4 gap-6">
                            <div className="col-span-4 lg:col-span-1 text-center bg-blue-400 p-5 rounded-md shadow-md">
                                <span className="text-7xl">{ timeLeft['days'] }</span>
                                <span className="block text-sm">Days</span>
                            </div>
                            <div className="col-span-4 lg:col-span-1 text-center bg-blue-400 p-5 rounded-md shadow-md">
                                <span className="text-7xl">{ timeLeft['hours'] }</span>
                                <span className="block text-sm">Hours</span>
                            </div>
                            <div className="col-span-4 lg:col-span-1 text-center bg-blue-400 p-5 rounded-md shadow-md">
                                <span className="text-7xl">{ timeLeft['minutes'] }</span>
                                <span className="block text-sm">Minutes</span>
                            </div>
                            <div className="col-span-4 lg:col-span-1 text-center bg-blue-400 p-5 rounded-md shadow-md">
                                <span className="text-7xl">{ timeLeft['seconds'] }</span>
                                <span className="block text-sm">Seconds</span>
                            </div>
                        </div>
                   :
                        <h2 className="text-white text-4xl italic">Time is up! Boss is here.</h2>}
                </div>
            </main>
        </div>
    )
}
