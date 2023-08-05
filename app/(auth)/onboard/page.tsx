import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

type Props = {};

const OnBoardPage = async (props: Props) => {
  const user = await currentUser();
  const userInfo = {};
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className=" text-2xl font-bold text-white">Onboarding</h1>
      <p className="mt-3 text-white">
        Complete your profile now to use Threads
      </p>

      <section className="mt-9 bg-neutral-900/80 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default OnBoardPage;
