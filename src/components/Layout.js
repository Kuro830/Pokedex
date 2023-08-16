import React from "react";

const Layout = ({ children }) => {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-yellow-500 text-white p-4">
                    <h1 className="text-center text-4xl my-4 text-gray-700 relative">
                        {"P"}
                        <i
                            className="inline-block h-6 w-6 bg-no-repeat"
                            style={{ backgroundImage: "url('/img/pokeball.svg')" }}
                        />

                        {"kédex"}
                        <span className="absolute left-1/2 -translate-x-1/2 top-full h-px w-8 bg-red-500" />
                    </h1>
                </header>
                <main className="container mx-auto p-4">{children}</main>
                <footer className="bg-yellow-500 text-white p-4 mt-8">
                    <div className="container mx-auto text-center">
                        &copy; {new Date().getFullYear()} Pokedex App
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Layout;
