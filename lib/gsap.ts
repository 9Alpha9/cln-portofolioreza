import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  if (!(window as unknown as { __gsapPluginsRegistered?: boolean }).__gsapPluginsRegistered) {
    try {
      gsap.registerPlugin(ScrollTrigger, Flip);
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });
      (window as unknown as { __gsapPluginsRegistered: boolean }).__gsapPluginsRegistered = true;
    } catch {}
  }
}

export { gsap, ScrollTrigger, Flip };
