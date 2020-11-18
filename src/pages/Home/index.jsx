import React from 'react';
import { Route, Link } from 'react-router-dom';

// Reusable Components
import CustomersSVG from '../../components/svg/CustomersSVG';
import DriversSVG from '../../components/svg/DriversSVG';

// Components
import Login from './Login';
import { FeatureImg, FeatureText } from './Feature';
import SignInModal from './SignInModal';

// Assets
import landingBackground from '../../assets/landing.png';
import logoWhite from '../../assets/logo-white.svg';
import logoBackground from '../../assets/logo-background.svg';
import buildingSVG from '../../assets/illustrations/building.svg';
import driverSVG from '../../assets/illustrations/driver.svg';
import houseSVG from '../../assets/illustrations/house.svg';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="flex flex-col items-center justify-between h-screen text-white bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url("${landingBackground}")`,
          maxHeight: '720px',
        }}
      >
        <header className="flex items-center justify-between w-full max-w-screen-xl px-10 py-8 mx-auto md:px-16">
          <img src={logoWhite} alt="logo" className="w-32" />
          <nav>
            <Link
              className="flex items-center justify-center w-full px-6 py-2 font-semibold text-white rounded bg-brand-red md:px-6 md:py-3"
              to="/login"
            >
              <svg
                className="hidden mr-3 sm:inline"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
              >
                <path
                  d="M10.5 7.5l-3 3.25m3-3.25l-3-3m3 3H1m6-6h6.5v12H7"
                  stroke="currentColor"
                ></path>
              </svg>
              Sign in
            </Link>
          </nav>
        </header>
        <h1 className="px-3 text-2xl text-center md:text-4xl lg:text-5xl">
          we <span className="italic font-semibold">deliver</span> it to your{' '}
          <span className="italic font-semibold">door</span> within{' '}
          <span className="italic font-semibold">one hour</span>
        </h1>
        <nav className="flex flex-wrap px-3 py-16 space-y-2 text-center lg:w-full lg:max-w-3xl md:space-y-0 md:space-x-10 md:flex-no-wrap">
          <Login type="drivers">
            <DriversSVG className="hidden w-8 h-8 text-white fill-current md:block" />
          </Login>
          <Login type="customers">
            <CustomersSVG className="hidden w-8 h-8 text-white fill-current md:block" />
          </Login>
        </nav>
      </section>

      <main className="flex flex-col items-center justify-between max-w-screen-lg px-16 py-12 mx-auto space-y-12 md:space-y-16 md:py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">How it works</h2>
        <div className="grid grid-rows-3 text-center gap-y-8 md:gap-y-6 gap-x-8 md:gap-x-20 sm:grid-cols-2 place-items-center sm:text-left">
          <FeatureText
            title="We do more than delivery."
            description="Stocking Your Restaurant Kitchen Finding Reliable Sellers Of Cookware In The Brick And Mortar World"
          />
          <FeatureImg src={houseSVG} />
          <FeatureImg src={driverSVG} />
          <FeatureText
            title="Fast Delivery with tracking."
            description="Breast Augmentation Breast Enlargement Medical Tourism In The Philippine"
          />
          <FeatureText
            title="Stay at home we do it for you."
            description="Planning Helps Make A Party Perfect Keep Dinner Simple Heat Frozen Vegetables And Precooked Smoked Sausage Together For A Complete Meal."
          />
          <FeatureImg src={buildingSVG} />
        </div>
      </main>

      <section className="text-white bg-brand-red">
        <div
          style={{ backgroundImage: `url("${logoBackground}")` }}
          className="flex flex-col items-center max-w-screen-lg py-16 mx-auto space-y-10 bg-no-repeat bg-contain"
        >
          <div className="flex flex-col items-center space-y-5">
            <h2 className="text-2xl font-semibold md:text-4xl lg:text-5xl">
              Receive our newsletter!
            </h2>
            <p className="max-w-xl px-3 text-sm text-center md:max-w-2xl md:text-lg lg:text-2xl">
              Browse local restaurants and businesses available in your area for
              delivery by entering your address below.
            </p>
          </div>
          <form className="flex w-full max-w-lg px-4 text-sm sm:text-base">
            <input
              type="text"
              aria-label="email"
              className="flex-grow inline p-2 text-black placeholder-black placeholder-opacity-50 border-t-2 border-b-2 border-l-2 border-white rounded-l sm:px-4 sm:py-3 focus:outline-none focus:border-brand-gray"
              placeholder="Enter your email..."
            />
            <button
              className="px-8 py-2 font-semibold border-t-2 border-b-2 border-r-2 rounded-r sm:px-12 sm:py-3 bg-brand-black border-brand-black focus:border-brand-gray focus:outline-none"
              type="submit"
            >
              Send
              <svg
                className="inline w-4 h-4 ml-3 text-white fill-current"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.707.293a1 1 0 00-1.043-.234l-14 5a.999.999 0 00-.111 1.835l4.586 2.292L11 5l-4.187 5.862 2.292 4.586a1.004 1.004 0 001.838-.112l5-14c.129-.363.037-.77-.236-1.043z" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      <footer className="w-full max-w-screen-xl px-16 py-4 mx-auto text-center text-black text-opacity-75 md:text-left">
        &copy;{new Date().getFullYear()} Grabit Privacy Policy
      </footer>
      <Route path={['/login', '/signup/:type']}>
        <SignInModal />
      </Route>
    </div>
  );
}
