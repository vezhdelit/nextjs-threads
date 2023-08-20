import { fetchCommunities } from "@/lib/actions/community.actions";
import React from "react";
import UserCard from "../cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

type Props = {};

const RightSideBar = async (props: Props) => {
  const user = await currentUser();
  if (!user) return null;

  const suggestedCommunities = await fetchCommunities({ pageSize: 4 });
  const suggestedUsers = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });

  return (
    <section className="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto bg-midnight  px-10 pb-6 pt-28 max-xl:hidden">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-white">Suggested Communities</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {suggestedCommunities.communities.length > 0 ? (
            <>
              {suggestedCommunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  userType="Community"
                />
              ))}
            </>
          ) : (
            <p className="text-white">No communities yet</p>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-white">Suggested Users</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          {suggestedUsers.users.length > 0 ? (
            <>
              {suggestedUsers.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  userType="User"
                />
              ))}
            </>
          ) : (
            <p className="text-white">No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
