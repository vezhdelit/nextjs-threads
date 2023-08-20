import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboar");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <section className=" max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-white">Edit Profile</h1>

      <div className=" bg-midnight p-10 rounded-xl  mt-9">
        <AccountProfile user={userData} btnTitle="Continue" />
      </div>
    </section>
  );
}

export default Page;
