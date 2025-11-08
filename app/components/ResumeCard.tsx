import React from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'

const ResumeCard = ({resume:{id,companyName,feedback,imagePath,jobTitle}}:{resume:Resume}) => {
 
    console.log(imagePath)
    return (
    <>
    <Link to={`/resume/${id}`} className='resume-card animate-in fade-in duration-1000 w-full ' >
    <div className='flex justify-between '>
        <div className='flex flex-col gap-2  '>
        <h2 className='!text-black font-bold break-words '>
            {companyName}
        </h2>
        <h3 className='text-lg text-gray-500 wrap-break-word' >
            {jobTitle}

        </h3>
    </div>
    <div className='shrink-0' >
        <ScoreCircle score={feedback.overallScore} ></ScoreCircle>
    </div>
    </div>
    <div className='gradient-border animate-in fade-in duration-1000 ' >
        <div className='w-full h-full' >
            <img 
            src={imagePath}
            alt='resume'
            className=' w-full h-[350px] max-sm:h-[200px] object-cover  '
             />

        </div>
    </div>
    
    </Link>
    </>
  )
}

export default ResumeCard