import { Outlet } from "react-router-dom";

// ============= || MINIMAL LAYOUT || ==================== //

const DefaultLayout = () => (
  <>
    <Outlet />
    {/*  <Customization /> */}
  </>
);

export default DefaultLayout;
