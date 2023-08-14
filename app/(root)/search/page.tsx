import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SearchPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboard");
  }

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
    sortBy: "desc",
  });

  return (
    <section>
      <h1 className="text-2xl font-semibold text-white">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="text-center text-white">No users found</p>
        ) : (
          <>
            {result.users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                userType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
