import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";

export default async function Home({searchParams} : {searchParams: Promise<{query?:string}>}) {
    const query = (await searchParams).query;
    const params = {search:query || null}
    const {data:posts} = await sanityFetch({query:STARTUPS_QUERY, params})
    // const posts = [
    //     {
    //         _createdAt : new Date(),
    //         views : 55,
    //         author : {_id:1,name:"Elon Musk"},
    //         _id:1,
    //         description: "This is description",
    //         image : "https://imgs.search.brave.com/iC7SHDXYElim7Vbcy46n9Y0VgaJwch8JxwrhsZ8mizw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3N0YXRpYy5jb20v/YWl0ZXN0a2l0Y2hl/bi93ZWJzaXRlL2Nv/bnRlbnQvaW1hZ2Ut/ZngtcGxlYXNlLXNp/Z24taW4ud2VicA",
    //         category: "Robots",
    //         title : "We Robots"
    //     },
    // ]
    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Pitch Your Startup, <br/>Connect With Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
                </p>
                <SearchForm query={query}/>
            </section>
            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search result for ${query}`: "All Startups"}
                </p>
                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: StartupTypeCard) => (
                            <StartupCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className="no-results">No startups found</p>
                    )}
                </ul>
            </section>
            <SanityLive/>
        </>
    );
}
