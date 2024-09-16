
const Hero = () => {
  return (
    <>

      <div class="from-green-sage to-green-nyanzalight bg-gradient-to-b ">
        <div class="relative isolate px-6 pt-14 lg:px-8">
          <div class="text-9xl text-center font-sans font-semibold font-black text-cyan-600 antialiased pt-20 ">AppOintment</div>
          <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          </div>
          <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="hidden sm:mb-8 sm:flex sm:justify-center">
              <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of features. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
            <div class="text-center">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Your medical care facility</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600"> We connect patients with top healthcare providers at convenience </p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <a href="/loginpatient">
                  <button className="bg-blue-500  text-white font-bold py-2 px-4 rounded drop-shadow-xl hover:drop-shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
                    Sign In
                  </button>
                </a>
                <a href="/registerpatient">
                  <button className="bg-green-sage  text-white font-bold py-2 px-4 rounded drop-shadow-xl hover:drop-shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
                    Sign Up
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            {/* <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#046856] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div> */}
          </div>
        </div>
      </div>


      <div class='bg-green-nyanzalight flex flex-row justify-center justify-items-stretch content-evenly'>
        <div class="justify-evenly basis-1/2 p-5 text-5xl p-5  content-center">
        <div class='m-10 p-6 font-poppins text-center leading-normal '>
          No need to wait in lines, just in a few clicks your appointment with your doctor is set
          </div>
        </div>
        <div class=" basis-1/2"><img src="/doctor-appointment.jpg" alt='Doctor is checking bp of patient' /></div>
      </div>


      <div class='bg-green-nyanzalight flex flex-row justify-evenly justify-items-stretch content-evenly gap-4'>
        <div class=" basis-1/2"><img className="w-600" src="/doctors.jpg" alt='Doctor is checking bp of patient' /></div>
        <div class=" basis-1/2 p-10 text-5xl font-poppins text-center content-center leading-normal ">
         We keep record of all your checkups from all your doctors in one place
        </div>
      </div>


      <div class='bg-green-nyanzalight flex flex-row justify-center justify-items-stretch content-evenly'>
        <div class="justify-evenly basis-1/2 p-5 text-5xl p-5  content-center">
        <div class='m-10 p-10 font-poppins text-center leading-normal '>
          You only need to go to the doctor when physical checkup is necessary
          </div>
        </div>
        <div class=" basis-1/2"><img src="/doctor-patient-bp-check.jpg" alt='Doctor is checking bp of patient' /></div>
      </div>


      <div class='bg-green-nyanzalight flex flex-row justify-evenly justify-items-stretch content-evenly'>
        <div class=" basis-1/2"><img src="/AdobeStock_136041571.jpeg" alt='Doctor is checking bp of patient' /></div>
        <div class=" basis-1/2 text-5xl p-10 font-poppins text-center content-center leading-normal">
          We build trust between patients and doctors
        </div>
      </div>

      <div class='bg-green-nyanzalight flex flex-row justify-center justify-items-stretch content-evenly '>
        <div class="justify-evenly basis-1/2 p-5 text-5xl p-5  content-center">
        <div class='m-10 p-10 font-poppins text-center '>
          Video calling with your doctor
          </div>
        </div>
        <div class=" basis-1/2"><img src="/telemedicine-1.jpg" alt='Doctor is checking bp of patient' /></div>
      </div>

      <div class="h-96 justify-evenly basis-1/2 p-5 text-5xl p-5 text-center bg-gray-battleship content-center">
         
        <div className='h-64 p-4  grid grid-flow-col justify-stretch'>
          <div class='p-5 '>column 01</div>
          <div class='p-5 '>column 02</div>
          <div class='p-5 '>column 03</div>
        </div>
        <div className="text-center text-xl">&copy; 2024 <span className="">AppOintment by <a href="https://www.acmeware.net" target="_blank">www.Acmeware.net</a></span> All rights reserved.</div>
      </div>
    </>
  );
};

export default Hero;

