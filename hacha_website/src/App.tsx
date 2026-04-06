import './App.css';
import ReflexNavbar from './Components/navbar';
import HacHacHero from './Components/hero';
import AboutSection from './Components/aboutsection';
import EventsSection from './Components/previousevents';
import GalleryPartnersSection from './Components/gallery';
import ContactFooter from './Components/contact-footer';

function App() {
  return (
    <>
      <ReflexNavbar />

      <div id="home">
        <HacHacHero />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="events">
        <EventsSection />
      </div>

      <div id="gallery">
        <GalleryPartnersSection />
      </div>

      <div id="contact">
        <ContactFooter />
      </div>
    </>
  );
}

export default App;