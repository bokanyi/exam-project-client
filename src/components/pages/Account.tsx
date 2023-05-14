import useGlobal from "../../hooks/useGlobal";
import { $user, deleteAccount, login, logout } from "../../states/user";
import { $modal, handleModal } from "../../states/modal";

export const Account = () => {
  const user = useGlobal($user);
  const modal = useGlobal($modal);

  return (
    <div className="account">
      
        <p>{(user?.display_name).toUpperCase()}</p>
        <hr />
      
        <p>{(user?.email).toUpperCase()}</p>
        <hr />
  
        <p>
          
          <a href={user?.spotify} target="blank">
            ACCOUNT ON SPOTIFY
          </a>
        </p>
      
      <div>
        <button
          onClick={() => {
            handleModal("confirm-account");
          }}
        >
          DELETE ACCOUNT
        </button>
        <button onClick={logout}>LOG OUT</button>
      </div>
    </div>
  );
};
