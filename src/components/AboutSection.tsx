import React from 'react'

const skills = [
    { skill: "HTML" },
    { skill: "CSS" },
    { skill: "Javascript" },
    { skill: "Typescript" },
    { skill: "Python" },
    { skill: "ReactJS" },
    { skill: "NextJS" },
    { skill: "TailwindCSS" },
    { skill: "C++" },
]

function AboutSection() {
  return (
    <section id='about'>
        <div className='my-12 pb-12 md:pt-16 md:pb-48'>
            <h1 className='text-center font-bold text-4xl'>
                About Me
                <hr className='w-6 h-1 mx-auto my-4 bg-blue-950 border-0 rounded'/>
            </h1>
            <div className='flex flex-col space-y-10 items-stretch justify-center align-top md:flex-row md:text-left md:p-4 md:space-y-0 md:space-x-10'>
                <div className='md:w-1/2'>
                    <h1 className='text-center font-bold text-2xl mb-6 md:text-left'>Get to know me!</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem provident eligendi nesciunt dolorum, perferendis quod, quam perspiciatis, incidunt neque necessitatibus unde cum aliquid enim. Autem, atque pariatur? Veritatis, praesentium.</p>
                    <br />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur voluptatem provident eligendi nesciunt dolorum, perferendis quod, quam perspiciatis, incidunt neque necessitatibus unde cum aliquid enim. Autem, atque pariatur? Veritatis, praesentium.</p>
                </div>
                <div className='md:w-1/2'>
                    <h1 className='text-center text-2xl font-bold mb-6 md:text-left'>My Skills</h1>
                    <div className='flex flex-wrap flex-row justify-center md:justify-start'>
                        {skills.map((item, index) => {
                            return <p key={index} className='bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold'>{item.skill}</p>
                        })}
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default AboutSection