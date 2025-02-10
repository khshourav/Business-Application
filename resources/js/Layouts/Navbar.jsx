import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
    GlobeAltIcon,
    AcademicCapIcon,
    UsersIcon,
    CogIcon,
    TagIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [dropdownTimeout, setDropdownTimeout] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 100); // Adjust scroll threshold as needed
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleServicesHover = (open) => {
        if (dropdownTimeout) clearTimeout(dropdownTimeout);
        setIsServicesOpen(open);
    };

    const startDropdownTimeout = () => {
        setDropdownTimeout(setTimeout(() => setIsServicesOpen(false), 300));
    };

    return (
        <>
            {/* Under Construction Banner */}
            <div className={`fixed top-0 left-0 w-full bg-yellow-500 text-black text-center py-2 z-50 transition-all duration-300 ${
                isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
            }`}>
                <p className="text-sm font-semibold">
                    🚧 The site is under construction. Thank you for your patience! 🚧
                </p>
            </div>

            {/* Navbar */}
            <nav
                className={`fixed w-full z-40 transition-all duration-300 ${
                    isScrolled 
                        ? "bg-transparent-accent shadow-lg top-0" 
                        : "bg-transparent top-[40px]"
                }`}
            >
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between lg:justify-around">
                        {/* Logo */}
                        <Link href="/" className="">
                            <img
                                src="/images/Logo.svg"
                                alt="AQI Services"
                                className="h-20 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/about"
                                className={`text-lg ${
                                    isScrolled
                                        ? "text-primary hover:text-black"
                                        : "text-accent/100 hover:text-secondary"
                                } transition-colors duration-300`}
                            >
                                About Us
                            </Link>

                            {/* Services Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleServicesHover(true)}
                                onMouseLeave={startDropdownTimeout}
                            >
                                <button
                                    className={`flex items-center gap-1 text-lg ${
                                        isScrolled
                                            ? "text-primary hover:text-black"
                                            : "text-accent/100 hover:text-secondary"
                                    } transition-colors duration-300`}
                                    onMouseEnter={() => handleServicesHover(true)}
                                >
                                    <Link href="/services">Services</Link>
                                    <ChevronDownIcon
                                        className={`w-5 h-5 transition-transform duration-300 ${
                                            isServicesOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {isServicesOpen && (
                                    <div
                                        className="absolute top-full left-0 mt-2 w-56 bg-accent rounded-lg shadow-lg py-2 transition-opacity duration-300"
                                        onMouseEnter={() => handleServicesHover(true)}
                                        onMouseLeave={startDropdownTimeout}
                                    >
                                        <Link
                                            href="/social"
                                            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary hover:text-accent transition-colors duration-300"
                                        >
                                            <UsersIcon className="w-5 h-5" />
                                            Social Compliance
                                        </Link>
                                        <Link
                                            href="/management"
                                            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary hover:text-accent transition-colors duration-300"
                                        >
                                            <CogIcon className="w-5 h-5" />
                                            Management Systems
                                        </Link>
                                        <Link
                                            href="/product-certification"
                                            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary hover:text-accent transition-colors duration-300"
                                        >
                                            <TagIcon className="w-5 h-5" />
                                            Product Certification
                                        </Link>
                                        <Link
                                            href="/environmental-services"
                                            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary hover:text-accent transition-colors duration-300"
                                        >
                                            <GlobeAltIcon className="w-5 h-5" />
                                            Environmental Services
                                        </Link>
                                        <Link
                                            href="/training"
                                            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary hover:text-accent transition-colors duration-300"
                                        >
                                            <AcademicCapIcon className="w-5 h-5" />
                                            Training
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/verify-certificate"
                                className={`text-lg ${
                                    isScrolled
                                        ? "text-primary hover:text-black"
                                        : "text-accent hover:text-secondary"
                                } transition-colors duration-300`}
                            >
                                Certificate Check
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-lg ${
                                    isScrolled
                                        ? "text-primary hover:text-black"
                                        : "text-accent hover:text-secondary"
                                } transition-colors duration-300`}
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/resources"
                                className={`text-lg ${
                                    isScrolled
                                        ? "text-primary hover:text-black"
                                        : "text-accent hover:text-secondary"
                                } transition-colors duration-300`}
                            >
                                Resources
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-accent hover:text-secondary transition-colors duration-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="w-8 h-8" />
                            ) : (
                                <Bars3Icon className="w-8 h-8" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 bg-accent shadow-lg rounded-lg transition-opacity duration-300">
                            <div className="px-6 py-4 space-y-4">
                                <Link
                                    href="/about"
                                    className="block text-primary hover:text-black font-medium py-2 transition-colors duration-300"
                                >
                                    About Us
                                </Link>

                                <div className="relative">
                                    <button
                                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                        className="w-full flex items-center justify-between text-primary hover:text-black font-medium py-2 transition-colors duration-300"
                                    >
                                        <Link href="/services">Services</Link>
                                        <ChevronDownIcon
                                            className={`w-5 h-5 transition-transform duration-300 ${
                                                isMobileServicesOpen ? "rotate-180" : ""
                                            } text-current`}
                                            strokeWidth={2}
                                        />
                                    </button>

                                    {isMobileServicesOpen && (
                                        <div className="ml-4 mt-2 space-y-3 border-l-2 border-primary pl-3">
                                            <Link
                                                href="/social"
                                                className="flex items-center gap-2 text-primary hover:text-black transition-colors duration-300"
                                            >
                                                <UsersIcon className="w-5 h-5" />
                                                Social Compliance
                                            </Link>
                                            <Link
                                                href="/management"
                                                className="flex items-center gap-2 text-primary hover:text-black transition-colors duration-300"
                                            >
                                                <CogIcon className="w-5 h-5" />
                                                Management Systems
                                            </Link>
                                            <Link
                                                href="/product-certification"
                                                className="flex items-center gap-2 text-primary hover:text-black transition-colors duration-300"
                                            >
                                                <TagIcon className="w-5 h-5" />
                                                Product Certification
                                            </Link>
                                            <Link
                                                href="/environmental-services"
                                                className="flex items-center gap-2 text-primary hover:text-black transition-colors duration-300"
                                            >
                                                <GlobeAltIcon className="w-5 h-5" />
                                                Environmental Services
                                            </Link>
                                            <Link
                                                href="/training"
                                                className="flex items-center gap-2 text-primary hover:text-black transition-colors duration-300"
                                            >
                                                <AcademicCapIcon className="w-5 h-5" />
                                                Training
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href="/verify-certificate"
                                    className="block text-primary hover:text-black font-medium py-2 transition-colors duration-300"
                                >
                                    Certificate Check
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block text-primary hover:text-black font-medium py-2 transition-colors duration-300"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href="/resources"
                                    className="block text-primary hover:text-black font-medium py-2 transition-colors duration-300"
                                >
                                    Resources
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
