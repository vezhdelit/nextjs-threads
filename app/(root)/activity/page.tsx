import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const ActivityPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboard");
  }

  const activity = await getActivity(userInfo._id);
  return (
    <section>
      <h1 className="text-2xl font-semibold text-white">Activity</h1>

      <div className=" mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="flex items-center gap-2 rounded-md bg-neutral-900 px-7 py-4">
                  <Image
                    src={activity.author.image}
                    alt="profile picture"
                    width={32}
                    height={32}
                    className=" rounded-full object-cover"
                  />
                  <p className="text-white text-sm">
                    <span className=" text-violet-600 font-medium">
                      {activity.author.name}
                    </span>
                    {" replied to your thread"}
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-white">No activity yet</p>
        )}
      </div>
    </section>
  );
};

export default ActivityPage;
