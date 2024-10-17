import { getRegions } from "#/data/api";
import { apiErrorHandler, getAllUsers, makeApiRequest } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { RootState } from "@/store/store";
import { useLoadData, useTitle } from "@/utils/hooks";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface User {
  email: string;
  user_id: string;
  region_id: string;
  is_admin: boolean;
}

export default function UsersPage() {
  useTitle("Users");
  const [users, loading, setData] = useLoadData(getAllUsers);
  const [search, setSearch] = useState("");
  const currentUser = useSelector((state: RootState) => state.auth.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const visibleUsers = (users || []).filter(
    (user: User) => !search || user.email.includes(search)
  );

  function changeUserRegion(userId: string, newRegionId: string) {
    const newUsers = users.map((user: User) => {
      if (user.user_id === userId) {
        return {
          ...user,
          region_id: newRegionId,
        };
      }
      return user;
    });
    setData(newUsers);
    makeApiRequest("PATCH", `users/${userId}`, {
      region_id: newRegionId,
    })
      .then(() => toast.success("Updated"))
      .catch(apiErrorHandler);
  }

  function changeUserIsAdmin(userId: string, isAdmin: string) {
    const newUsers = users.map((user: User) => {
      if (user.user_id === userId) {
        return {
          ...user,
          is_admin: isAdmin === "true",
        };
      }
      return user;
    });
    setData(newUsers);
    makeApiRequest("PATCH", `users/${userId}`, {
      is_admin: isAdmin === "true",
    })
      .then(() => toast.success("Updated"))
      .catch(apiErrorHandler);
  }

  return (
    <div className="pt-5">
      <div className="text-center mb-10">
        <input
          value={search}
          className="bg-background border-b-text-primary border-b-2 text-text-primary"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="users-table gap-y-5 gap-x-4">
        <div className="font-bold">Email</div>
        <div className="font-bold">Region</div>
        <div className="font-bold">Admin</div>
        {(visibleUsers || []).map((user: User, i: number) => {
          return (
            <Fragment key={user.user_id}>
              <div className="truncate" title={user.email}>
                {user.email}
              </div>
              <div>
                <select
                  value={user.region_id}
                  className="bg-background w-full"
                  onChange={(e) =>
                    changeUserRegion(user.user_id, e.target.value)
                  }
                >
                  {getRegions().map((region) => {
                    return (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                {currentUser.is_super_admin ? (
                  <select
                    value={user.is_admin ? "true" : "false"}
                    className="bg-background w-full"
                    onChange={(e) =>
                      changeUserIsAdmin(user.user_id, e.target.value)
                    }
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                ) : (
                  <div>{user.is_admin ? "Yes" : "No"}</div>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
