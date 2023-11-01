import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <>
      <form
        action={async () => {
          "use server";

          // fix lint error
          await Promise.resolve();

          console.log("works");
        }}
      >
        <button type="submit">Works</button>
      </form>
      <form
        action={async () => {
          "use server";

          // fix lint error
          await Promise.resolve();

          revalidatePath("/");

          console.log("breaks the page");
        }}
      >
        <button type="submit">Broken</button>
      </form>

      <div>{hello.greeting}</div>
    </>
  );
}
