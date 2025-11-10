import React, { useEffect, useState } from 'react'
import  { Link, useNavigate, useParams } from 'react-router'
import ATS from '~/components/Ats';
import Ats from '~/components/Ats';
import Details from '~/components/Details';
import Summary from '~/components/Summary';
import { usePuterStore } from '~/lib/puter';

export const meta = () => [
  { title: 'Resumyte / Review' },
  { name: 'description', content: 'Detailed overview of your resume' },
];
const Resume = () => {
    const {auth,isLoading,kv,fs } = usePuterStore();
    const{id}  = useParams();
    const[imageUrl,setImageUrl] = useState('')
    const[resumeUrl,setResumeUrl] = useState('')
    const[feedback,setFeedback] = useState<Feedback| null>(null)
    const navigate = useNavigate();

     useEffect(()=>{
        if( !isLoading &&  !auth.isAuthenticated){
            navigate(`/auth?next=/resume${id}`)
        }
    },[auth.isAuthenticated,])

    useEffect(()=>{
        const loadResume = async () =>{
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob],{type: 'application/pdf'});
            const resueUrl = URL.createObjectURL(pdfBlob);

            setResumeUrl(resueUrl)

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob)
            setImageUrl(imageUrl)

            setFeedback(data.feedback)

            console.log(resueUrl)
            console.log(imageUrl)
            console.log(feedback)



        }
        loadResume()
    },[id])
  return (
    <main className=' !pt-0 ' >
        <nav className='resume-nav'>
            <Link to='/' className='back' />
            <img src='/icons/back.svg' alt='back' className='w-2.5 h-2.5' />
            <span className='text-gray-800 text-sm font-semibold'>Back to Homepage</span>
        </nav>
        <div className='flex flex-row w-full max-lg:flex-col-reverse '>
            <section className='fedback-section bg-[url("/images/bg-small.svg") bg-cover h-[100vh] sticky top-0 items-center justify-center ] animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-full  w-fit'>
                {imageUrl && resumeUrl && (
                    <div className='animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-full  w-fit' >
                            <a href={resumeUrl} target='_blank' rel='noopener noreferrer'  >
                                <img className='w-full h-full object-contain rounded-2xl '
                                title='resume'
                                src={imageUrl}
                                  />
                            </a>
                    </div>
                )}
            </section>
            <section className=' feedback-section ' >
                <h2 className=' text-4xl !text-black font-bold '>Resume Review</h2>
                {
                    feedback ? (
                        <div className='flex flex-col animate-in  ' >
                            <Summary feedback={feedback} />
                            <ATS score = {feedback?.ATS?.score || 0 } suggestions = {feedback.ATS.tips || [] } />
                            <Details feedback = {feedback} />
                        </div>
                    ): (
                        <img src='/images/resume-scan-2.gif' className='w-full'  />
                    )
                }
            </section>
        </div>
    </main>
  )
}

export default Resume