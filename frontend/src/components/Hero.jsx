
const Hero = () => {
  return (
    <>

      <div class="bg-green-sage ">
        <div class="relative isolate px-6 pt-14 lg:px-8">
          <div class="text-9xl text-center font-sans font-semibold font-black text-cyan-600 antialiased pt-20">AppOintment</div>
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
                <a href="/login">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Sign In
                  </button>
                </a>
                <a href="/register">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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


      <div class='bg-green-nyanzalight flex flex-row justify-center justify-items-stretch content-evenly gap-4'>
        <div class="justify-evenly basis-1/2 p-5 text-5xl p-5">
        <div class='m-10 p-6 font-poppins text-center'>
          No need to wait in lines, just in a few clicks your appointment with your doctor is set
          </div>
        </div>
        <div class=" basis-1/2"><img src="/doctor-appointment.jpg" alt='Doctor is checking bp of patient' /></div>
      </div>


      <div class=' flex flex-row justify-evenly justify-items-stretch content-evenly gap-4'>
        <div class=" basis-1/2"><img src="/doctors.jfif" alt='Doctor is checking bp of patient' /></div>
        <div class=" basis-1/2 p-10 text-5xl font-poppins text-center">
         We keep your record of all your checkups from all your doctors at one place
        </div>
      </div>


      <div class='bg-green-nyanzalight flex flex-row justify-center justify-items-stretch content-evenly gap-4'>
        <div class="justify-evenly basis-1/2 p-5 text-5xl p-5">
        <div class='m-10 p-10 font-poppins text-center'>
          You only need to go to the doctor when physical checkup is necessary
          </div>
        </div>
        <div class=" basis-1/2"><img src="/doctor-patient-bp-check.jpg" alt='Doctor is checking bp of patient' /></div>
      </div>


      <div class=' flex flex-row justify-evenly justify-items-stretch content-evenly gap-4'>
        <div class=" basis-1/2"><img src="/AdobeStock_136041571.jpeg" alt='Doctor is checking bp of patient' /></div>
        <div class=" basis-1/2 text-5xl p-10 font-poppins text-center">
          We build trust between doctors and patients
        </div>
      </div>


      <div class="h-400 justify-evenly basis-1/2 p-5 text-5xl p-5 text-center">
      footer
      </div>
    </>
  );
};

export default Hero;

