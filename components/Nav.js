import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Connect from '../components/ConnectButton';
import Dashboard from '../components/Buttons/DashboardButton';

import DashboardMobile from '../components/Buttons/DashboardButtonMobile';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="">
        <div className="">
          <div class="sticky top-0 max-w-7xl mx-auto  w-full px-4 py-4 flex justify-between items-center bg-white">
            <a
              href="/"
              className=" text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline"
            >
              <h1 className="lg:ml-2 text-5xl Avenir tracking-tighter text-gray-900 md:text-4x1 lg:text-5xl">
                illoMX
              </h1>
              <span className="absolute font-light text-gray-300 tracking-tight text-sm transform translate-x-28 -translate-y-2">
                beta
              </span>
            </a>

            <ul class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
              <li>
                <a
                  class="text-base text-gray-400 hover:text-gray-500 font-light"
                  href="/market"
                >
                  market
                </a>
              </li>

              <li className="hidden">
                <a
                  class="text-md text-gray-400 hover:text-gray-500 font-light"
                  href="/dashboard"
                >
                  dashboard
                </a>
              </li>

              <li>
                <a
                  class="text-md text-gray-400 hover:text-gray-500 font-light"
                  href="/faq"
                >
                  faq
                </a>
              </li>

              <Dashboard />
            </ul>
            <div class="hidden absolute top-1/2 -right-10 px-2 transform -translate-y-1/2 -translate-x-1/4 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto ">
              <Connect />
            </div>
            <div class="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gradient-to-br from-purple-600 via-blue-500 to-green-300 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#FFFFFF"
                    aria-hidden="true"
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  >
                    <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#FFFFFF"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition show={isOpen}>
          {(ref) => (
            <div class="absolute top-0 left-0 h-screen w-screen z-9999">
              <div class="fixed inset-0 bg-gray-800 opacity-25 "></div>
              <div class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm pt-4 pr-4 pl-4 bg-white border-r overflow-y-auto">
                <div class="flex justify-between mb-6 mx-2">
                  <a
                    href="/"
                    className="text-lg font-normal rounded-lg tracking-widest focus:outline-none focus:shadow-outline"
                  >
                    <h1 className="text-4xl font-semibold Avenir tracking-tighter text-gray-900 md:text-3x1 lg:text-4xl">
                      illoMX
                    </h1>
                    <span className="absolute font-light text-gray-300 tracking-tight text-xs transform translate-x-20 -translate-y-2.5">
                      beta
                    </span>
                  </a>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <svg
                      class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <ul className="mx-2 mt-2 z-9999">
                    <li>
                      <a
                        class="flex justify-start block w-56 p-4 text-sm  text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"
                        href="/market"
                      >
                        {' '}
                        market
                      </a>
                    </li>

                    <li>
                      <a
                        class="flex justify-start block w-56 p-4 text-sm  text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"
                        href="/faq"
                      >
                        faq
                      </a>
                    </li>

                    <li class="mb-1">
                      <DashboardMobile />
                    </li>

                    <li class="mb-1 text-center">
                      <Connect />
                    </li>
                  </ul>
                </div>
                <div class="mt-auto">
                  <p class="my-4 text-xs text-center text-gray-400">
                    <span>Copyright © 2021</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
