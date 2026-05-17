export const BrowserRouter = ({ children }) => children;
export const MemoryRouter = ({ children }) => children;
export const Routes = () => null;
export const Route = () => null;
export const Link = ({ children }) => children;
export const NavLink = ({ children }) => children;

export const useNavigate = () => () => {};
export const useLocation = () => ({ pathname: "/" });
export const useParams = () => ({});

export default {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useLocation,
  useParams,
};
