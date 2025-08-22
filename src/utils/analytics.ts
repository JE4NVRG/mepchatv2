// Google Analytics 4
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export const gtag = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
  gtag('event', eventName, parameters);
};

export const trackPageView = (pagePath: string) => {
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_path: pagePath,
  });
};

// Meta Pixel
export const fbq = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
};

export const trackFacebookEvent = (eventName: string, parameters?: Record<string, string | number | boolean>) => {
  fbq('track', eventName, parameters);
};

// Hotjar
export const hj = (...args: unknown[]) => {
  if (typeof window !== 'undefined') {
    const windowWithHj = window as Window & { hj?: (...args: unknown[]) => void };
    if (windowWithHj.hj) {
      windowWithHj.hj(...args);
    }
  }
};

export const trackHotjarEvent = (eventName: string) => {
  hj('event', eventName);
};

// Combined tracking functions
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  });
  trackFacebookEvent('Lead', {
    content_name: ctaName,
    content_category: 'CTA',
  });
  trackHotjarEvent(`cta_${ctaName.toLowerCase().replace(/\s+/g, '_')}`);
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
  
  if (success) {
    trackFacebookEvent('CompleteRegistration', {
      content_name: formName,
    });
    trackHotjarEvent(`form_${formName.toLowerCase().replace(/\s+/g, '_')}_success`);
  }
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
  trackHotjarEvent(`section_${sectionName.toLowerCase().replace(/\s+/g, '_')}_view`);
};