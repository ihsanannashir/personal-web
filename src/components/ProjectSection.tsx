import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {BsGithub, BsArrowUpRightSquare } from 'react-icons/bs'
import SlideUp from './SlideUp'

//projects will be updated regularly
const projects = [
    {
        name: "Mooviku",
        desc: "A Movie customize catalog web using TMDB API. Mooviku is a collaboration project that consist of Web and Android App. I created the web version and it was done for personal purpose.",
        image: "https://github.com/ihsanannashir/movie-web-app/raw/main/public/thumbnail.png?raw=true",
        github: "https://github.com/ihsanannashir/movie-web-app",
        link: "https://mooviku.vercel.app/",
    },
    {
        name: "Bookshelf App",
        desc: "A simple bookshelf web app integrated with local storage for readings tracking, created to complete a dicoding web development submission.",
        image: "https://github.com/ihsanannashir/bookshelf-app/blob/main/styles/img/bookshelf.png?raw=true",
        github: "https://github.com/ihsanannashir/bookshelf-app",
        link: "https://ihsanannashir.github.io/bookshelf-app/",
    },
    {
        name: "Defood App",
        desc: "A simple food delivery app. I created the app's frontend UI as part of a final project for my community's event.",
        image: "/defood.png",
        github: "https://github.com/ihsanannashir/defood-app",
        link: "",
    },
]

function ProjectSection() {
  return (
    <section id='projects'>
        <h1 className='text-center font-bold text-4xl'>
            Projects
            <hr className='w-6 h-1 mx-auto my-4 bg-blue-600 border-0 rounded'/>
        </h1>
        <div className='flex flex-col space-y-20'>
            {projects.map((projects, index) => {
                return (
                    <div key={index}>
                        <SlideUp offset='-300px 0px -300px 0px'>
                            <div className='flex flex-col animate-slideUpCubiBezier animation-delay-2 md:flex-row md:space-x-12'>
                                <div className='mt-8 md:w-1/2'>
                                    <Link href={projects.link ? projects.link : projects.github} target='_blank'>
                                        <Image
                                            src={projects.image}
                                            alt=""
                                            width={1000}
                                            height={1000}
                                            className='rounded-xl shadow-xl hover:opacity-70'
                                        />
                                    </Link>
                                </div>
                                <div className='mt-12 md:w-1/2'>
                                    <h1 className='text-4xl font-bold mb-6'>{projects.name}</h1>
                                    <p className='text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400'>{projects.desc}</p>
                                    <div className='flex flex-row align-bottom space-x-4'>
                                        <Link href={projects.github} target='_blank'>
                                            <BsGithub
                                                size={30}
                                                className='hover:-translate-y-1 transition-transform cursor-pointer'
                                            />
                                        </Link>
                                        <Link href={projects.link ? projects.link : '/'} target='_blank'>
                                            <BsArrowUpRightSquare
                                                    size={30}
                                                    className={`hover:-translate-y-1 transition-transform cursor-pointer ${projects.link ? projects.link : 'hidden'}`}
                                                />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SlideUp>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default ProjectSection