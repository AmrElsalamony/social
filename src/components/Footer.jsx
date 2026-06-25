import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import {
    
    LinkedIn,
    GitHub,
    WhatsApp,
} from "@mui/icons-material";

export default function Footer() {
    return (
        <footer className="card border-t mt-10 rounded-none">

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Top */}
                <div className="flex flex-col md:flex-row justify-between gap-8">

                    {/* Logo & Description */}
                    <div className="max-w-sm">

                        <h2 className="text-2xl font-bold text-blue-600">
                            Amr SocialApp
                        </h2>

                        <p className="text-sub mt-3">
                            Connect with friends, share your moments,
                            and discover new experiences.
                        </p>

                    </div>

                    {/* Links */}
                    <div>

                        <h3 className="font-semibold mb-3 text-main">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 *:text-sub">

                            <li>
                                <Link
                                    to="/"
                                    className=" hover:text-blue-600 transition"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/profile"
                                    className="hover:text-blue-600 transition"
                                >
                                    Profile
                                </Link>
                            </li>



                        </ul>

                    </div>

                    {/* Social */}
                    <div>

                        <h3 className="font-semibold mb-3 text-main">
                            Follow Us
                        </h3>

                        <div className="flex gap-2 ">
                            <a href="https://wa.me/201129600311" target="_blank">
                                <IconButton>
                                    <WhatsApp className="text-sub" />
                                </IconButton>
                            </a>

                            <a href="https://www.linkedin.com/in/amr-ahmed-0bb9401a7" target="_blank">
                                <IconButton>
                                    <LinkedIn className="text-sub" />
                                </IconButton>
                            </a>
                            <a href="https://github.com/AmrElsalamony" target="_blank">
                                <IconButton>
                                    <GitHub className="text-sub" />
                                </IconButton>
                            </a>
                              <a href="https://amrelsalamony.github.io/portfolio/" target="_blank">
                                <IconButton>
                                     <LinkIcon className="text-sub" />
                                </IconButton>
                            </a>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className=" border-t-[1px] border-t-['#65676B'] mt-8 pt-5 text-center text-sub text-sm">

                    © {new Date().getFullYear()} Amr Ahmed.
                    All rights reserved.

                </div>

            </div>

        </footer>
    );
}