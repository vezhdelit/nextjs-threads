//app/page.tsx
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";

const Home = async () => {
  const { threads } = await fetchThreads({ pageNumber: 1, pageSize: 5 });
  const user = await currentUser();

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {threads.length === 0 ? (
          <p className="no-result"></p>
        ) : (
          <>
            {threads.map((thread) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
