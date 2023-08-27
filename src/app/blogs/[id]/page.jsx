import SingleBlog from "@/components/posts/SingleBlog";

export default function Page({ params }) {

  return (
    <>
      <SingleBlog id={params.id} />
    </>
  )
}