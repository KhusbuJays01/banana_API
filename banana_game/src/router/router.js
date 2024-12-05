import DefaultLayout from "../views/DefaultLayout";
import Game from "../views/Game";
import GuestLayout from "../views/GuestLayout";
import History from "../views/History";
import SignUp from "../views/signup";

const { createBrowserRouter } = require("react-router-dom");
const { default: SignIn } = require("../views/signin");
// const { default: SignUp } = require("../views/dashboard/auth/sign-up");

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: "/signup",
                element: <SignUp />
            },

        ]
    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: '/game',
                element: <Game />
            },
            {
                path: '/history',
                element: <History />
            }
        ]
    },
]);

export default router;