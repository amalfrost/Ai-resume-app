import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resyme" },
    { name: "description", content: "Smart resume analyzer" },
  ];
}

export default function Home() {
  
    const {auth} =  usePuterStore();

    const navigate = useNavigate()

    useEffect(()=>{
        if(!auth.isAuthenticated){
            navigate('/auth?next=/')
        }
    },[auth.isAuthenticated,])

  return <main className="bg-amber-50 w-full " >
    <Navbar/>
    <section className="main-section py-10">
  <div className="page-heading text-center mb-10">
    <h1 className="text-3xl font-bold text-gray-900">
      Track your Applications & Resume ratings!
    </h1>
    <h2 className="text-lg text-gray-600 mt-2">
      Review your submission and check AI-powered feedback
    </h2>
  </div>

  {resumes.length > 0 && (
    <div
      className="
        resume-section
        grid 
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        px-6
        md:px-10
        place-items-center
      "
    >
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  )}
</section>


  </main>;
}
