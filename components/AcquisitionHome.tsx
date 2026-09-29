import Hero from './home/Hero';
import BuyingProblem from './home/BuyingProblem';
import FourLayers from './home/FourLayers';
import Industries from './home/Industries';
import Programme from './home/Programme';
import Evidence from './home/Evidence';
import Snapshot from './home/Snapshot';
import Fit from './home/Fit';
import Faqs from './home/Faqs';
import BookCall from './home/BookCall';
import FinalCta from './home/FinalCta';
import ExitIntentPopup from './shared/ExitIntentPopup';

/* The homepage. `/` renders this; it is the only consumer.
 *
 * Every section below is a SERVER COMPONENT. The only client code that reaches
 * this route is ScrollReveal and MaskReveal — two IntersectionObserver
 * wrappers, used strictly as wrappers around server children — plus the
 * exit-intent listener. ADR-0005 §2.
 *
 * THE MISTAKE TO WATCH FOR, and the one Owen should look for first: a section
 * authored with the reveal wrapper INSIDE a client section instead of a server
 * parent passing {children} into the wrapper. Do it the wrong way round and the
 * entire section client-renders, the budget in ADR-0005 §5 fails, and nothing
 * about the diff looks wrong.
 *
 * THE LIGHT/DARK ALTERNATION IS THE DESIGN, NOT A THEME CHOICE (CLAUDE.md §9).
 * Light hero on warm off-white, dark feature band, light content, dark band,
 * light, and a dark CTA to close. Do not flatten it to one surface in either
 * direction — the operator confirmed the existing qognitionagency.com treatment
 * and it is kept exactly.
 *
 * Mechanically: a section is dark by carrying data-theme="dark", which remaps
 * the --s-* surface roles in globals.css to the dark ramp. No component branches
 * on ground, and nothing is set at :root, so a dark band inside a light page
 * needs no !important anywhere.
 *
 * Section order is docs/copy/home.md, with two departures, both recorded there:
 * the client-logo strip is not rendered (no logos with written permission, so
 * §4 says omit rather than fill), and the competitor-gap block is not rendered
 * (carries [NEEDS DATA] for a dated audit that does not exist).
 */
export default function AcquisitionHome() {
  return (
    <main id="main-content">
      <Hero />
      <BuyingProblem />
      <FourLayers />
      <Industries />
      <Programme />
      <Evidence />
      <Snapshot />
      <Fit />
      <Faqs />
      <BookCall />
      <FinalCta />
      <ExitIntentPopup />
    </main>
  );
}
