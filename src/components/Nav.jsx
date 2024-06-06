import { useNavigate, Link } from "react-router-dom";
import AppButton from "./AppButton";
import { useAuth } from "../contexts/AuthContext";
const Nav = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <nav className="flex justify-between items-center">
      <div className="basis-1/6 p-2 cursor-pointer">
        <h2 className="text-blue-600 font-bold text-2xl">SqiCommerce</h2>
      </div>
      <div className="flex justify-evenly items-center basis-3/6">
        <p className="p-2 text-neutral-500 font-semibold cursor-pointer">
          <Link to={"/create-product"}>Create</Link>
        </p>
        <p className="p-2 text-neutral-500 font-semibold cursor-pointer">
          About
        </p>
        <p className="p-2 text-neutral-500 font-semibold cursor-pointer">
          Services
        </p>
      </div>
      {token ? (
        <div className="flex justify-between items-center basis-1/6">
          <p className="text-[10px]">
            {user?.firstname} {user?.lastname}
          </p>
          <AppButton
            text={"Logout"}
            textColor={"blue"}
            bgColor={"white"}
            useBorder={true}
            handleClick={logout}
          />
        </div>
      ) : (
        <div className="flex justify-between items-center basis-1/6">
          <AppButton
            text={"Login"}
            textColor={"white"}
            bgColor={"blue"}
            handleClick={handleLogin}
          />
          <AppButton
            text={"Signup"}
            textColor={"blue"}
            bgColor={"white"}
            useBorder={true}
            handleClick={handleSignup}
          />
        </div>
      )}
    </nav>
  );
};

export default Nav;
