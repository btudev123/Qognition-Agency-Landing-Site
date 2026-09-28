import Hero from './home/Hero';
import BuyingProblem from './home/BuyingProblem';
import FourLayers from './home/FourLayers';
import Industries from './home/Industries';
import Programme from './home/Programme';
import Evidence from './home/Evidence';
import Snapshot from './home/Snapshot';
import Fit from './home/Fit';
import Faqs from './home/Faqs';
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
 * data-theme="dark" now sits here rather than on each section, because the last
 * light growth-* block is gone. Dark is the primary surface (CLAUDE.md §9);
 * long-form reading surfaces — /insights and /case-studies bodies, /legal —
 * omit the attribute and inherit the :root light tokens.
 *
 * Section order is docs/copy/home.md, with two departures, both recorded there:
 * the client-logo strip is not rendered (no logos with written permission, so
 * §4 says omit rather than fill), and the competitor-gap block is not rendered
 * (carries [NEEDS DATA] for a dated audit that does not exist).
 */
export default function AcquisitionHome() {
  return (
    <main id="main-content" data-theme="dark">
      <Hero />
      <BuyingProblem />
      <FourLayers />
      <Industries />
      <Programme />
      <Evidence />
      <Snapshot />
      <Fit />
      <Faqs />
      <FinalCta />
      <ExitIntentPopup />
    </main>
  );
}
