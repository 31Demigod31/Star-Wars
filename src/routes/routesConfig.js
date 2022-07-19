
import PeoplePage from "@containers/PeoplePage/PeoplePage";
import PersonPage from "@containers/PersonPage/PersonPage";
import HomePage from "@containers/HomePage/HomePage";
import NotFoundPage from "@containers/NotFoundPage/NotFoundPage";
import FavoritesPage from "@containers/FavoritesPage/FavoritesPage";

const routesConfig = [
    {
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        path: '/people',
        exact: true,
        component: PeoplePage
    },
    {
        path: '/people/:id',
        exact: true,
        component: PersonPage
    },
    {
        path: '*',
        exact: false,
        component: FavoritesPage
    },
    {
        path: '/favorites',
        exact: true,
        component: NotFoundPage
    },
    {
        path: '*',
        exact: false,
        component: NotFoundPage
    }
    
];

export default routesConfig;