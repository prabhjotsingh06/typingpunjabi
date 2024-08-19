"use client"
import Link from 'next/link'
import Aside from '@/components/aside'
import { useEffect, useState } from 'react'

function Lesson() {
    useEffect(()=>{
        async function fechdata(){
            const res = await fetch("/api/all");
            const { data } = await res.json()
            console.log(data)
            setLessonsData(data)
        }
        fechdata();
    },[])
    function Categorylessons(array){
        let filteredrows = array.filter((obj)=>obj.Category===plan).map((obj)=>obj.row)

        let output = filteredrows.filter((item , index)=>filteredrows.indexOf(item) === index)
        return output
    }
    const [lessonsData, setLessonsData] = useState({})
    const [plan, setPlan] = useState('Bignner')
    function setdata(data){
        setPlan(data)
    }
    return(
<main className="flex justify-end w-[100svw] hide-scrollbar">
    <Aside data={setdata} />
    <section className="flex flex-col border-2 m-0 border-black pt-2 rounded-md w-screen sm:w-[80vw] h-[calc(100vh-2.5lh)] overflow-scroll hide-scrollbar gap-2 bg-gradient-to-tr from-sky-200 via-sky-400 to-sky-500 ">
        { 
        JSON.stringify(lessonsData) === "{}"
        ?   <>
                <h1 className="mx-3 font-semibold">loding Lessons</h1>
                <div className="flex flex-col p-1 mx-3 text-3xl border-2 border-black rounded-md bg-slate-300">{
                    [...Array(20)].map(()=><div className='flex items-center justify-between p-2 mx-2 my-1 border-2 border-black h-[1.5lh] rounded-md bg-slate-50 '></div>  )
                
                }</div>
            </>
        : Categorylessons(lessonsData).map((a)=><>
            <h1 className="mx-3 font-semibold">{a} Lessons</h1>
            <div className="flex flex-col p-1 mx-3 border-2 border-black rounded-md bg-slate-300">
                {lessonsData.filter((item)=>item.Category===plan && item.row===a)
                .map((b)=><Link href={`/lesson/${b._id}`} className={`flex items-center justify-between p-2 mx-2 my-1 border-2 border-black rounded-md hover:mx-1 ${b.accuracy ? "bg-green-200" : "bg-slate-200"}`}>
                    <p className='text-xl'>{b.title}</p>
                    <div className="flex items-center justify-center text-3xl">
                        <p>{b.accuracy>=40 ? "⭐" : "☆"}</p>
                        <p>{b.accuracy>=70 ? "⭐" : "☆"}</p>
                        <p>{b.accuracy>=90 ? "⭐" : "☆"}</p>
                    </div>
                </Link>)}
            </div></>)
        }
        
    </section>
</main>)
}
export default Lesson