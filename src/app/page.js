import { PostsSlider } from '@/components/PostsSlider';


export default async function Home() {

  return (
    <>
    <section className='flex flex-col gap-2 w-4/5 mx-auto my-2'>
      <PostsSlider/>
    </section>
    </>
  );
}