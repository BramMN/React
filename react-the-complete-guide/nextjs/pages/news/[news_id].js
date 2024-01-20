import { useRouter } from 'next/router'

function Detailpage() {
    const router = useRouter();

    console.log(router.query.news_id);
    
    return <h1>The Detail Page</h1>
}

export default Detailpage;
