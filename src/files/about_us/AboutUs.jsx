import React from 'react';
import pic from "./aboutUs.png";
import Navbar from "../navbar/Navbar"; 

export const AboutUs = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* Navbar component */}
      <Navbar />
      
      {/* Content */}
      <div className='flex flex-col md:flex-row flex-1 justify-center items-center bg-black'>
        <div className='md:w-1/2 mx-8 ml-8'>
          <p className="font-bold text-2xl md:text-4xl text-white mb-4">About Us</p>
          <div>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat nulla nec metus ullamcorper, at ullamcorper nisl vestibulum. Proin efficitur arcu id ligula pharetra volutpat. Nullam tristique, nisi in egestas fringilla, lorem turpis facilisis magna, non eleifend odio metus et mauris. Donec auctor, eros in varius luctus, ante enim fermentum felis, vitae suscipit libero risus in libero.
            </p>
          </div>
        </div>
        <div className='md:w-1/2 md:mx-4'>
          <img src={pic} alt="About Us Illustration" className="md:max-w-full h-auto" /> 
        </div>
      </div>
    </div>
  );
}

export default AboutUs;









// import React from 'react'

// export const AboutUs = () => {
//   return (
//     <div className='flex justify-center items-center'>
//         <p className="text-bold text-white"> About Us</p>
//     <div className='flex flex-col'>
//         <div className=''>
//             <p>
//             Lorem epsum
//             </p>
//         </div>

//         <div className=''>
//             <img src={}/>
//         </div>
//     </div>
    {/* <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure>
//     </div> */}
//   )
// }
